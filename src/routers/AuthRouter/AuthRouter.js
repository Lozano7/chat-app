import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import LoginScreen from '../../components/pages/auth/login/LoginScreen';
import RegisterScreen from '../../components/pages/auth/register/RegisterScreen';
import './index.css';

const AuthRouter = () => {
  return (
    <div className='Auth-Router'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
      </Routes>
    </div>
  );
};

export default AuthRouter;
