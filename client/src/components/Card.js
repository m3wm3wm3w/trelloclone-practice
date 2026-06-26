import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCard, deleteCard } from '../redux/slices/currentBoardSlice';
import ConfirmModal from './ConfirmModal';

function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    await dispatch(updateCard({ 
      cardId: card._id, 
      data: { name, description } 
    }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteCard(card._id));
  };

  if (isEditing) {
    return (
      <div className="card card-editing">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название карточки"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание (опционально)"
        />
        <div className="card-actions">
          <button onClick={handleSave} className="btn-primary">Сохранить</button>
          <button onClick={() => setIsEditing(false)} className="btn-secondary">Отмена</button>
          <button onClick={() => setShowDeleteConfirm(true)} className="btn-delete">Удалить</button>
        </div>

        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Удалить карточку?"
          message={`Вы уверены, что хотите удалить карточку "${card.name}"? Это действие нельзя отменить.`}
          confirmText="Удалить"
          cancelText="Отмена"
          danger={true}
        />
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
