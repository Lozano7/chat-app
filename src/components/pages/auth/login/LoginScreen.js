import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  initialStateUsers,
  userActions,
} from '../../../../app/slices/usersSlide';
import { auth, db } from '../../../../firebase/firebase-config';
import validarForm from '../../../../helpers/validarForm';
import Button from '../../../button/Button';
import Form from '../../../form/Form';
import Input from '../../../input/Input';
import { useForm } from './../../../../hooks/useForm';
import './login.css';
const LoginScreen = () => {
  const [formValues, handleInputChange, handleLoadingErrors, reset] = useForm({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { email, password, error, loading } = formValues;

  const handleSignInWithGoogle = async () => {
    handleLoadingErrors({ loading: true });
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      const { uid, email, displayName: name } = user;
      await setDoc(doc(db, 'users', uid), {
        uid: uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      const users = {
        user: {
          name,
          email,
        },
        logged: true,
      };
      localStorage.setItem('user', JSON.stringify(users));
      reset();
      dispatch(
        userActions.login({
          user: {
            name,
            email,
          },
          logged: true,
        })
      );
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      handleLoadingErrors({ error: 'Authentication failed', loading: false });
      setTimeout(() => {
        reset();
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value, error } = validarForm({ email, password });
    handleLoadingErrors({ error });
    if (value) {
      try {
        handleLoadingErrors({ loading: true });
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateDoc(doc(db, 'users', user.uid), {
          isOnline: true,
        });
        const users = {
          user: {
            name: user.displayName,
            email: email,
          },
          logged: true,
        };
        localStorage.setItem('user', JSON.stringify(users));
        reset();
        dispatch(userActions.login(users));
        navigate('/');
      } catch (error) {
        console.log(error);
        const errorMessage = ('' + error)
          .slice(-16)
          .replace(')', '')
          .replace(/-/g, ' ');
        handleLoadingErrors({ error: errorMessage, loading: false });
        setTimeout(() => {
          reset();
        }, 3000);
      }
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || initialStateUsers;
    dispatch(userActions.login(user));
  }, [dispatch]);
  return (
    <div className='container-form'>
      <div className='form-login'>
        <h2 className='mt-4'>Login</h2>
        <div className='container p-4'>
          <Form onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <Input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <Button
              btnColor='btn-primary'
              text={loading ? 'Loading...' : 'Sign in'}
              disable={loading}
            />
          </Form>
          {error && (
            <p className='d-flex justify-content-center text-danger mt-3 '>
              {error}
            </p>
          )}
        </div>
        <Button
          btnColor='btn-danger mb-4'
          text={loading ? 'Loading...' : 'Sign in with Google'}
          onClick={handleSignInWithGoogle}
          disable={loading}
        />
      </div>
    </div>
  );
};

export default LoginScreen;
