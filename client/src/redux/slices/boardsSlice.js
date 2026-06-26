import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/boards');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch boards');
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData, { rejectWithValue }) => {
    try {
      const response = await api.post('/boards', boardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create board');
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, { rejectWithValue }) => {
    try {
      await api.delete(`/boards/${boardId}`);
      return boardId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete board');
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    ownedBoards: [],
    memberBoards: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Boards
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.ownedBoards = action.payload.ownedBoards;
        state.memberBoards = action.payload.memberBoards;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Board
      .addCase(createBoard.fulfilled, (state, action) => {
        state.ownedBoards.push(action.payload);
      })
      // Delete Board
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.ownedBoards = state.ownedBoards.filter(b => b._id !== action.payload);
        state.memberBoards = state.memberBoards.filter(b => b._id !== action.payload);
      });
  }
});

export const { clearError } = boardsSlice.actions;
export default boardsSlice.reducer;
