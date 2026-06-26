const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');
const auth = require('../middleware/auth');

// Get all boards for current user
router.get('/', auth, async (req, res) => {
  try {
    const ownedBoards = await Board.find({ owner: req.userId })
      .populate('owner', 'firstName lastName email')
      .populate('members', 'firstName lastName email');
    
    const memberBoards = await Board.find({ members: req.userId })
      .populate('owner', 'firstName lastName email')
      .populate('members', 'firstName lastName email');

    res.json({ ownedBoards, memberBoards });
  } catch (error) {
    console.error('Get boards error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get board by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate('owner', 'firstName lastName email')
      .populate('members', 'firstName lastName email');

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Check if user has access
    const hasAccess = board.owner._id.equals(req.userId) || 
                      board.members.some(member => member._id.equals(req.userId));
    
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get lists and cards
    const lists = await List.find({ board: board._id }).sort('position');
    const cards = await Card.find({ list: { $in: lists.map(l => l._id) } }).sort('position');

    res.json({ board, lists, cards });
  } catch (error) {
    console.error('Get board error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create board
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Board name is required' });
    }

    const board = new Board({
      name: name.trim(),
      owner: req.userId,
      members: []
    });

    await board.save();
    await board.populate('owner', 'firstName lastName email');

    res.status(201).json(board);
  } catch (error) {
    console.error('Create board error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add member to board
router.post('/:id/members', auth, async (req, res) => {
  try {
    const { email } = req.body;
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Only owner can add members
    if (!board.owner.equals(req.userId)) {
      return res.status(403).json({ error: 'Only owner can add members' });
    }

    const User = require('../models/User');
    const userToAdd = await User.findOne({ email });

    if (!userToAdd) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already a member
    if (board.members.includes(userToAdd._id)) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    board.members.push(userToAdd._id);
    await board.save();
    await board.populate('members', 'firstName lastName email');

    // Emit socket event
    const io = req.app.get('io');
    io.to(board._id.toString()).emit('board:member-added', { member: userToAdd });

    res.json(board);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete board
router.delete('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Only owner can delete
    if (!board.owner.equals(req.userId)) {
      return res.status(403).json({ error: 'Only owner can delete board' });
    }

    // Delete all lists and cards
    const lists = await List.find({ board: board._id });
    await Card.deleteMany({ list: { $in: lists.map(l => l._id) } });
    await List.deleteMany({ board: board._id });
    await board.deleteOne();

    res.json({ message: 'Board deleted' });
  } catch (error) {
    console.error('Delete board error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
