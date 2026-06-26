import { io } from 'socket.io-client';
import { 
  addConnectedUser, 
  removeConnectedUser,
  socketListCreated,
  socketListDeleted,
  socketCardCreated,
  socketCardUpdated,
  socketCardMoved,
  socketCardDeleted
} from '../redux/slices/currentBoardSlice';

let socket = null;

export const connectSocket = (boardId, dispatch) => {
  console.log(`🔌 Connecting socket for board: ${boardId}`);
  
  if (!socket) {
    socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    console.log('✅ Socket.io instance created');
  }

  // Удаляем старые слушатели перед добавлением новых
  socket.off('user:joined');
  socket.off('user:left');
  socket.off('list:created');
  socket.off('list:deleted');
  socket.off('card:created');
  socket.off('card:updated');
  socket.off('card:moved');
  socket.off('card:deleted');

  socket.emit('join:board', boardId);
  console.log(`📤 Emitted join:board for ${boardId}`);

  // Подтверждение присоединения к комнате
  socket.once('board:joined', ({ boardId: joinedBoardId }) => {
    console.log(`✅ Successfully joined board room: ${joinedBoardId}`);
  });

  socket.on('user:joined', ({ socketId }) => {
    console.log('👤 User joined:', socketId);
    dispatch(addConnectedUser(socketId));
  });

  socket.on('user:left', ({ socketId }) => {
    console.log('👤 User left:', socketId);
    dispatch(removeConnectedUser(socketId));
  });

  socket.on('list:created', (list) => {
    console.log('📋 List created:', list);
    dispatch(socketListCreated(list));
  });

  socket.on('list:deleted', ({ listId }) => {
    console.log('🗑️  List deleted:', listId);
    dispatch(socketListDeleted(listId));
  });

  socket.on('card:created', (card) => {
    console.log('🃏 Card created:', card);
    dispatch(socketCardCreated(card));
  });

  socket.on('card:updated', (card) => {
    console.log('✏️  Card updated:', card);
    dispatch(socketCardUpdated(card));
  });

  socket.on('card:moved', (card) => {
    console.log('↔️  Card moved:', card);
    dispatch(socketCardMoved(card));
  });

  socket.on('card:deleted', ({ cardId }) => {
    console.log('🗑️  Card deleted:', cardId);
    dispatch(socketCardDeleted(cardId));
  });

  return socket;
};

export const disconnectSocket = (boardId) => {
  if (socket) {
    socket.emit('leave:board', boardId);
  }
};

export const getSocket = () => socket;
