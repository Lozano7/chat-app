import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from '../app/store';
import Home from '../components/pages/Home/Home';
import AuthRouter from './AuthRouter/AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path='/auth/*'
            element={
              <PublicRoute>
                <AuthRouter />
              </PublicRoute>
            }
          />
          <Route
            path='/*'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRouter;
