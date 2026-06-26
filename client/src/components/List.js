import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { createCard, deleteList } from '../redux/slices/currentBoardSlice';
import Card from './Card';

function List({ list, cards }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const dispatch = useDispatch();

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (cardName.trim()) {
      await dispatch(createCard({ listId: list._id, name: cardName }));
      setCardName('');
      setIsAddingCard(false);
    }
  };

  const handleDeleteList = async () => {
    if (window.confirm(`Удалить список "${list.name}" и все карточки в нём?`)) {
      await dispatch(deleteList(list._id));
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        <h3>{list.name}</h3>
        <button onClick={handleDeleteList} className="btn-delete-list" title="Удалить список">
          ×
        </button>
      </div>
      
      <div className="cards-container">
        {cards.map((card, index) => (
          <Draggable key={card._id} draggableId={card._id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? 0.8 : 1
                }}
              >
                <Card card={card} />
              </div>
            )}
          </Draggable>
        ))}
      </div>

      {isAddingCard ? (
        <form onSubmit={handleAddCard} className="card-add-form">
          <textarea
            placeholder="Введите название карточки..."
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            autoFocus
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">Добавить</button>
            <button type="button" onClick={() => setIsAddingCard(false)} className="btn-secondary">
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAddingCard(true)} className="btn-add-card">
          + Добавить карточку
        </button>
      )}
    </div>
  );
}

export default List;
