import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchBoard = createAsyncThunk(
  'currentBoard/fetchBoard',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/boards/${boardId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch board');
    }
  }
);

export const createList = createAsyncThunk(
  'currentBoard/createList',
  async ({ boardId, name }, { rejectWithValue }) => {
    try {
      const response = await api.post('/lists', { name, boardId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create list');
    }
  }
);

export const createCard = createAsyncThunk(
  'currentBoard/createCard',
  async ({ listId, name }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cards', { name, listId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create card');
    }
  }
);

export const updateCard = createAsyncThunk(
  'currentBoard/updateCard',
  async ({ cardId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cards/${cardId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update card');
    }
  }
);

export const deleteCard = createAsyncThunk(
  'currentBoard/deleteCard',
  async (cardId, { rejectWithValue }) => {
    try {
      await api.delete(`/cards/${cardId}`);
      return cardId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete card');
    }
  }
);

const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState: {
    board: null,
    lists: [],
    cards: [],
    connectedUsers: [],
    loading: false,
    error: null
  },
  reducers: {
    addConnectedUser: (state, action) => {
      if (!state.connectedUsers.includes(action.payload)) {
        state.connectedUsers.push(action.payload);
      }
    },
    removeConnectedUser: (state, action) => {
      state.connectedUsers = state.connectedUsers.filter(id => id !== action.payload);
    },
    socketListCreated: (state, action) => {
      // Проверяем, нет ли уже такого списка
      const exists = state.lists.some(list => list._id === action.payload._id);
      if (!exists) {
        state.lists.push(action.payload);
      }
    },
    socketCardCreated: (state, action) => {
      // Проверяем, нет ли уже такой карточки
      const exists = state.cards.some(card => card._id === action.payload._id);
      if (!exists) {
        state.cards.push(action.payload);
      }
    },
    socketCardUpdated: (state, action) => {
      const index = state.cards.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    socketCardDeleted: (state, action) => {
      state.cards = state.cards.filter(c => c._id !== action.payload);
    },
    clearBoard: (state) => {
      state.board = null;
      state.lists = [];
      state.cards = [];
      state.connectedUsers = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload.board;
        state.lists = action.payload.lists;
        state.cards = action.payload.cards;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createList.fulfilled, (state, action) => {
        // Проверяем, нет ли уже такого списка
        const exists = state.lists.some(list => list._id === action.payload._id);
        if (!exists) {
          state.lists.push(action.payload);
        }
      })
      .addCase(createCard.fulfilled, (state, action) => {
        // Проверяем, нет ли уже такой карточки
        const exists = state.cards.some(card => card._id === action.payload._id);
        if (!exists) {
          state.cards.push(action.payload);
        }
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter(c => c._id !== action.payload);
      });
  }
});

export const {
  addConnectedUser,
  removeConnectedUser,
  socketListCreated,
  socketCardCreated,
  socketCardUpdated,
  socketCardDeleted,
  clearBoard
} = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
