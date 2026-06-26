import { io } from 'socket.io-client';
import { 
  addConnectedUser, 
  removeConnectedUser,
  socketListCreated,
  socketCardCreated,
  socketCardUpdated,
  socketCardDeleted
} from '../redux/slices/currentBoardSlice';

let socket = null;

export const connectSocket = (boardId, dispatch) => {
  if (!socket) {
    socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
  }

  socket.emit('join:board', boardId);

  socket.on('user:joined', ({ socketId }) => {
    dispatch(addConnectedUser(socketId));
  });

  socket.on('user:left', ({ socketId }) => {
    dispatch(removeConnectedUser(socketId));
  });

  socket.on('list:created', (list) => {
    dispatch(socketListCreated(list));
  });

  socket.on('card:created', (card) => {
    dispatch(socketCardCreated(card));
  });

  socket.on('card:updated', (card) => {
    dispatch(socketCardUpdated(card));
  });

  socket.on('card:deleted', ({ cardId }) => {
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
