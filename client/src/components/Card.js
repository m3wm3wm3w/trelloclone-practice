import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCard, deleteCard } from '../redux/slices/currentBoardSlice';

function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description || '');
  const dispatch = useDispatch();

  const handleSave = async () => {
    await dispatch(updateCard({ 
      cardId: card._id, 
      data: { name, description } 
    }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      await dispatch(deleteCard(card._id));
    }
  };

  if (isEditing) {
    return (
      <div className="card card-editing">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Card title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Card description (optional)"
        />
        <div className="card-actions">
          <button onClick={handleSave} className="btn-primary">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" onClick={() => setIsEditing(true)}>
      <h4>{card.name}</h4>
      {card.description && <p className="card-description">{card.description}</p>}
    </div>
  );
}

export default Card;
