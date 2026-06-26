import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import boardsReducer from './slices/boardsSlice';
import currentBoardReducer from './slices/currentBoardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    currentBoard: currentBoardReducer
  }
});

export default store;
