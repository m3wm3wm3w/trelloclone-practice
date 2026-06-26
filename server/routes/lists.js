const express = require('express');
const router = express.Router();
const List = require('../models/List');
const Card = require('../models/Card');
const Board = require('../models/Board');
const auth = require('../middleware/auth');

// Create list
router.post('/', auth, async (req, res) => {
  try {
    const { name, boardId } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'List name is required' });
    }

    // Check board access
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get next position
    const lastList = await List.findOne({ board: boardId }).sort('-position');
    const position = lastList ? lastList.position + 1 : 0;

    const list = new List({
      name: name.trim(),
      board: boardId,
      position
    });

    await list.save();

    // Emit socket event
    const io = req.app.get('io');
    const boardIdStr = boardId.toString();
    console.log(`📡 Emitting list:created to room ${boardIdStr}`);
    io.to(boardIdStr).emit('list:created', list.toObject());

    res.status(201).json(list);
  } catch (error) {
    console.error('Create list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update list
router.put('/:id', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Check board access
    const board = await Board.findById(list.board);
    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (name) list.name = name.trim();
    await list.save();

    // Emit socket event
    const io = req.app.get('io');
    io.to(board._id.toString()).emit('list:updated', list);

    res.json(list);
  } catch (error) {
    console.error('Update list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete list
router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Check board access
    const board = await Board.findById(list.board);
    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete all cards in list
    await Card.deleteMany({ list: list._id });
    await list.deleteOne();

    // Emit socket event
    const io = req.app.get('io');
    const boardIdStr = board._id.toString();
    console.log(`📡 Emitting list:deleted to room ${boardIdStr}`);
    io.to(boardIdStr).emit('list:deleted', { listId: list._id.toString() });

    res.json({ message: 'List deleted' });
  } catch (error) {
    console.error('Delete list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
