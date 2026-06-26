require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trello-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/boards', require('./routes/boards'));
app.use('/api/lists', require('./routes/lists'));
app.use('/api/cards', require('./routes/cards'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  // Join board room
  socket.on('join:board', (boardId) => {
    socket.join(boardId);
    console.log(`📋 User ${socket.id} joined board ${boardId}`);
    
    // Подтверждаем клиенту что он присоединился
    socket.emit('board:joined', { boardId });
    
    // Уведомляем других пользователей в комнате
    socket.to(boardId).emit('user:joined', { socketId: socket.id });
  });

  // Leave board room
  socket.on('leave:board', (boardId) => {
    socket.leave(boardId);
    socket.to(boardId).emit('user:left', { socketId: socket.id });
    console.log(`📋 User ${socket.id} left board ${boardId}`);
  });

  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
