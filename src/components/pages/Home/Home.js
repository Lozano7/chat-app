import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import Chat from '../chat/Chat';
import Profile from '../Profile/Profile';
import './home.css';
const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<Chat />} />
      </Routes>
    </div>
  );
};

export default Home;
