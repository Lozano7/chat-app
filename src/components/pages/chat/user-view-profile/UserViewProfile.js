import React from 'react';
import './userViewProfile.css';
const profileImage = require.context('../../../../assets');
const UserViewProfile = ({ user = '', userName = '' }) => {
  return (
    <div className='user-view'>
      <img
        src={user.avatar || profileImage('./men.png')}
        alt=''
        className={user.isOnline ? 'online' : 'offline'}
      />
      <p>{userName || 'user'}</p>
    </div>
  );
};

export default UserViewProfile;
