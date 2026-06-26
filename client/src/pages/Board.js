import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, createList, clearBoard } from '../redux/slices/currentBoardSlice';
import { connectSocket, disconnectSocket } from '../services/socket';
import List from '../components/List';
import ConnectedUsers from '../components/ConnectedUsers';
import '../styles/Board.scss';

function Board() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board, lists, cards, connectedUsers, loading } = useSelector(state => state.currentBoard);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [listName, setListName] = useState('');

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

  if (loading) {
    return <div className="loading">Loading board...</div>;
  }

  if (!board) {
    return <div className="error">Board not found</div>;
  }

  return (
    <div className="board-page">
      <header className="board-header">
        <div className="board-header-left">
          <button onClick={() => navigate('/')} className="btn-back">← Back</button>
          <h1>{board.name}</h1>
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
                  placeholder="Enter list title..."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  autoFocus
                />
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Add List</button>
                  <button type="button" onClick={() => setIsCreatingList(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="list list-create" onClick={() => setIsCreatingList(true)}>
              <span>+ Add another list</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
