import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialStateUsers, userActions } from '../../app/slices/usersSlide';
import { auth, db } from '../../firebase/firebase-config';
import Button from '../button/Button';
import LinkRouter from '../LinkRouter/LinkRouter';

const Navbar = () => {
  const { logged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    localStorage.setItem('user', JSON.stringify(initialStateUsers));
    dispatch(userActions.logout(initialStateUsers));
  };
  return (
    <nav className='navbar navbar-dark bg-dark align-self-start d-block'>
      <div className='container-fluid'>
        <LinkRouter
          className='navbar-brand'
          to={{
            pathname: '/',
            replace: true,
          }}
          text='Chat App'
        />
        {!logged ? (
          <>
            <div className='d-flex'>
              <LinkRouter
                className='nav-link text-light'
                to={{
                  pathname: '/auth/login',
                  replace: true,
                }}
                text='Login'
              />
              <LinkRouter
                className='nav-link text-light'
                to={{
                  pathname: '/auth/register',
                  replace: true,
                }}
                text='Register'
              />
            </div>
          </>
        ) : (
          <>
            <div className='d-flex'>
              <LinkRouter
                className='nav-link text-light'
                to='profile'
                text='Profile'
              />
              <Button
                btnColor='text-light'
                onClick={handleLogout}
                text='Logout'
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
