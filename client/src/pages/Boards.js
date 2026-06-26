import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBoards, createBoard, deleteBoard } from '../redux/slices/boardsSlice';
import { signOut } from '../redux/slices/authSlice';
import '../styles/Boards.scss';

function Boards() {
  const [isCreating, setIsCreating] = useState(false);
  const [boardName, setBoardName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { ownedBoards, memberBoards, loading } = useSelector(state => state.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      await dispatch(createBoard({ name: boardName }));
      setBoardName('');
      setIsCreating(false);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      await dispatch(deleteBoard(boardId));
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="boards-page">
      <header className="boards-header">
        <h1>Trello Clone</h1>
        <div className="user-info">
          <span>Welcome, {user?.firstName}!</span>
          <button onClick={handleSignOut} className="btn-secondary">Sign Out</button>
        </div>
      </header>

      <div className="boards-content">
        <section className="boards-section">
          <h2>My Boards</h2>
          <div className="boards-grid">
            {ownedBoards.map(board => (
              <div key={board._id} className="board-card">
                <div onClick={() => navigate(`/boards/${board._id}`)} className="board-card-content">
                  <h3>{board.name}</h3>
                  <p className="board-owner">Owner: You</p>
                  <p className="board-members">{board.members.length} member(s)</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteBoard(board._id); }}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            ))}
            
            {isCreating ? (
              <div className="board-card board-create-form">
                <form onSubmit={handleCreateBoard}>
                  <input
                    type="text"
                    placeholder="Board name..."
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    autoFocus
                  />
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Create</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="board-card board-create" onClick={() => setIsCreating(true)}>
                <span className="plus-icon">+</span>
                <span>Create new board</span>
              </div>
            )}
          </div>
        </section>

        {memberBoards.length > 0 && (
          <section className="boards-section">
            <h2>Shared with Me</h2>
            <div className="boards-grid">
              {memberBoards.map(board => (
                <div key={board._id} className="board-card" onClick={() => navigate(`/boards/${board._id}`)}>
                  <h3>{board.name}</h3>
                  <p className="board-owner">Owner: {board.owner.firstName} {board.owner.lastName}</p>
                  <p className="board-members">{board.members.length} member(s)</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {loading && <div className="loading">Loading boards...</div>}
      </div>
    </div>
  );
}

export default Boards;
