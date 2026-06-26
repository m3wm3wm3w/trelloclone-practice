import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBoards, createBoard, deleteBoard } from '../redux/slices/boardsSlice';
import { signOut } from '../redux/slices/authSlice';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/Boards.scss';

function Boards() {
  const [isCreating, setIsCreating] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardToDelete, setBoardToDelete] = useState(null);
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

  const handleDeleteBoard = async () => {
    if (boardToDelete) {
      await dispatch(deleteBoard(boardToDelete._id));
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
          <span>Привет, {user?.firstName}!</span>
          <button onClick={handleSignOut} className="btn-secondary">Выйти</button>
        </div>
      </header>

      <div className="boards-content">
        <section className="boards-section">
          <h2>Мои доски</h2>
          <div className="boards-grid">
            {ownedBoards.map(board => (
              <div key={board._id} className="board-card">
                <div onClick={() => navigate(`/boards/${board._id}`)} className="board-card-content">
                  <h3>{board.name}</h3>
                  <p className="board-owner">Владелец: Вы</p>
                  <p className="board-members">{board.members.length} участник(ов)</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setBoardToDelete(board); }}
                  className="btn-delete"
                >
                  Удалить
                </button>
              </div>
            ))}
            
            {isCreating ? (
              <div className="board-card board-create-form">
                <form onSubmit={handleCreateBoard}>
                  <input
                    type="text"
                    placeholder="Название доски..."
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    autoFocus
                  />
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Создать</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="btn-secondary">
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="board-card board-create" onClick={() => setIsCreating(true)}>
                <span className="plus-icon">+</span>
                <span>Создать новую доску</span>
              </div>
            )}
          </div>
        </section>

        {memberBoards.length > 0 && (
          <section className="boards-section">
            <h2>Доступные мне</h2>
            <div className="boards-grid">
              {memberBoards.map(board => (
                <div key={board._id} className="board-card" onClick={() => navigate(`/boards/${board._id}`)}>
                  <h3>{board.name}</h3>
                  <p className="board-owner">Владелец: {board.owner.firstName} {board.owner.lastName}</p>
                  <p className="board-members">{board.members.length} участник(ов)</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {loading && <div className="loading">Загрузка досок...</div>}
      </div>

      <ConfirmModal
        isOpen={!!boardToDelete}
        onClose={() => setBoardToDelete(null)}
        onConfirm={handleDeleteBoard}
        title="Удалить доску?"
        message={boardToDelete ? `Вы уверены, что хотите удалить доску "${boardToDelete.name}"? Все списки и карточки будут удалены. Это действие нельзя отменить.` : ''}
        confirmText="Удалить доску"
        cancelText="Отмена"
        danger={true}
      />
    </div>
  );
}

export default Boards;
