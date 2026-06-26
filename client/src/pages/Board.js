import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, createList, clearBoard } from '../redux/slices/currentBoardSlice';
import { connectSocket, disconnectSocket } from '../services/socket';
import List from '../components/List';
import ConnectedUsers from '../components/ConnectedUsers';
import AddMemberModal from '../components/AddMemberModal';
import api from '../services/api';
import '../styles/Board.scss';

function Board() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board, lists, cards, connectedUsers, loading } = useSelector(state => state.currentBoard);
  const { user } = useSelector(state => state.auth);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [listName, setListName] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  const isOwner = board && user && board.owner._id === user._id;

  useEffect(() => {
    dispatch(fetchBoard(id));
    connectSocket(id, dispatch);

    return () => {
      disconnectSocket(id);
      dispatch(clearBoard());
    };
  }, [id, dispatch]);

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (listName.trim()) {
      await dispatch(createList({ boardId: id, name: listName }));
      setListName('');
      setIsCreatingList(false);
    }
  };

  const handleAddMember = async (boardId, email) => {
    await api.post(`/boards/${boardId}/members`, { email });
    dispatch(fetchBoard(id)); // Обновляем доску
  };

  if (loading) {
    return <div className="loading">Загрузка доски...</div>;
  }

  if (!board) {
    return <div className="error">Доска не найдена</div>;
  }

  return (
    <div className="board-page">
      <header className="board-header">
        <div className="board-header-left">
          <button onClick={() => navigate('/')} className="btn-back">← Назад</button>
          <h1>{board.name}</h1>
          {isOwner && (
            <button onClick={() => setShowAddMember(true)} className="btn-add-member">
              + Добавить участника
            </button>
          )}
        </div>
        <ConnectedUsers users={connectedUsers} boardMembers={board.members} owner={board.owner} />
      </header>

      <div className="board-content">
        <div className="lists-container">
          {lists.map(list => (
            <List 
              key={list._id} 
              list={list} 
              cards={cards.filter(card => card.list === list._id)} 
            />
          ))}

          {isCreatingList ? (
            <div className="list list-create-form">
              <form onSubmit={handleCreateList}>
                <input
                  type="text"
                  placeholder="Введите название списка..."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  autoFocus
                />
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Добавить список</button>
                  <button type="button" onClick={() => setIsCreatingList(false)} className="btn-secondary">
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="list list-create" onClick={() => setIsCreatingList(true)}>
              <span>+ Добавить список</span>
            </div>
          )}
        </div>
      </div>

      {showAddMember && (
        <AddMemberModal
          boardId={id}
          onClose={() => setShowAddMember(false)}
          onAdd={handleAddMember}
        />
      )}
    </div>
  );
}

export default Board;
