import React from 'react';

const UserInfo = ({ currentUser, openModal, loading }) => {
  if (loading) return null;
  return (
    <div className="user-info-container">
      <div className="user-info-username">
        <img src={currentUser.photoUrl} />
        <div>
          <h4>{currentUser.username}</h4>
          <p>{"#"+currentUser.salt}</p>
        </div>
      </div>
      <i
      className="fas fa-cog"
      onClick={() => openModal('userInfo')}></i>
    </div>
  )
}

export default UserInfo;
