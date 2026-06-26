import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from '../redux/slices/currentBoardSlice';
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

  return (
    <div className="list">
      <div className="list-header">
        <h3>{list.name}</h3>
      </div>
      
      <div className="cards-container">
        {cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </div>

      {isAddingCard ? (
        <form onSubmit={handleAddCard} className="card-add-form">
          <textarea
            placeholder="Enter a title for this card..."
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            autoFocus
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Card</button>
            <button type="button" onClick={() => setIsAddingCard(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAddingCard(true)} className="btn-add-card">
          + Add a card
        </button>
      )}
    </div>
  );
}

export default List;
