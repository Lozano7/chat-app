import React from 'react';
import User from './User';

const UsersList = ({ users, selectUser }) => {
  return (
    <section className='chat__users'>
      <h2 className='title-users'>Users: {users.length}</h2>
      <div className='chat__users-list'>
        {users.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
    </section>
  );
};

export default UsersList;
