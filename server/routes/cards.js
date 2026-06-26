const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');
const auth = require('../middleware/auth');

// Create card
router.post('/', auth, async (req, res) => {
  try {
    const { name, listId } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Card name is required' });
    }

    // Check list exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Check board access
    const board = await Board.findById(list.board);
    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get next position
    const lastCard = await Card.findOne({ list: listId }).sort('-position');
    const position = lastCard ? lastCard.position + 1 : 0;

    const card = new Card({
      name: name.trim(),
      list: listId,
      position
    });

    await card.save();

    // Emit socket event
    const io = req.app.get('io');
    const boardIdStr = board._id.toString();
    console.log(`📡 Emitting card:created to room ${boardIdStr}`);
    io.to(boardIdStr).emit('card:created', card.toObject());

    res.status(201).json(card);
  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update card
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Check board access
    const list = await List.findById(card.list);
    const board = await Board.findById(list.board);
    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (name !== undefined) card.name = name.trim();
    if (description !== undefined) card.description = description;
    await card.save();

    // Emit socket event
    const io = req.app.get('io');
    const boardIdStr = board._id.toString();
    console.log(`📡 Emitting card:updated to room ${boardIdStr}`);
    io.to(boardIdStr).emit('card:updated', card.toObject());

    res.json(card);
  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Move card to different list
router.put('/:id/move', auth, async (req, res) => {
  try {
    const { listId, position } = req.body;
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Check access
    const oldList = await List.findById(card.list);
    const newList = await List.findById(listId);
    const board = await Board.findById(oldList.board);
    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    card.list = listId;
    if (position !== undefined) card.position = position;
    await card.save();

    // Emit socket event
    const io = req.app.get('io');
    const boardIdStr = board._id.toString();
    console.log(`📡 Emitting card:moved to room ${boardIdStr}`);
    io.to(boardIdStr).emit('card:moved', card.toObject());

    res.json(card);
  } catch (error) {
    console.error('Move card error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete card
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Check board access
    const list = await List.findById(card.list);
    const board = await Board.findById(list.board);
    const hasAccess = board.owner.equals(req.userId) || board.members.includes(req.userId);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await card.deleteOne();

    // Emit socket event
    const io = req.app.get('io');
    const boardIdStr = board._id.toString();
    console.log(`📡 Emitting card:deleted to room ${boardIdStr}`);
    io.to(boardIdStr).emit('card:deleted', { cardId: card._id.toString() });

    res.json({ message: 'Card deleted' });
  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
