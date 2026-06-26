import React from 'react';

function ConnectedUsers({ users, boardMembers, owner }) {
  const allMembers = [owner, ...boardMembers];

  return (
    <div className="connected-users">
      <span className="users-label">Board Members:</span>
      <div className="users-list">
        {allMembers.map(member => (
          <div 
            key={member._id} 
            className={`user-avatar ${users.includes(member._id) ? 'online' : ''}`}
            title={`${member.firstName} ${member.lastName} ${users.includes(member._id) ? '(online)' : ''}`}
          >
            {member.firstName[0]}{member.lastName[0]}
          </div>
        ))}
      </div>
      <span className="online-count">{users.length} online</span>
    </div>
  );
}

export default ConnectedUsers;
