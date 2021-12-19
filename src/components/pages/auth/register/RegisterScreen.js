import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  initialStateUsers,
  userActions,
} from '../../../../app/slices/usersSlide';
import { auth, db } from '../../../../firebase/firebase-config';
import validarForm from '../../../../helpers/validarForm';
import { useForm } from '../../../../hooks/useForm';
import Button from '../../../button/Button';
import Form from '../../../form/Form';
import Input from '../../../input/Input';
import LinkRouter from '../../../LinkRouter/LinkRouter';
import './register.css';
const RegisterScreen = () => {
  const [formValues, handleInputChange, handleLoadingErrors, reset] = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: null,
    loading: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password, passwordConfirm, error, loading } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value, error } = validarForm({
      name,
      email,
      password,
      passwordConfirm,
    });
    handleLoadingErrors({ error, loading: false });
    if (value) {
      handleLoadingErrors({ loading: true });
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
        const user = {
          user: {
            name: name,
            email: email,
          },
          logged: true,
        };
        localStorage.setItem('user', JSON.stringify(user));
        reset();
        dispatch(userActions.login(user));
        navigate('/');
      } catch (error) {
        const errorMessage = ('' + error)
          .slice(-22)
          .replace(')', '')
          .replace(/-/g, ' ');
        handleLoadingErrors({ error: errorMessage, loading: false });
        setTimeout(() => {
          reset();
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || initialStateUsers;
    dispatch(userActions.login(user));
  }, [dispatch]);

  return (
    <div className='container-form'>
      <div className='formRegister'>
        <h2 className='mt-4'>Create an Acount</h2>
        <div className='container p-4'>
          <Form onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder='UserName'
              name='name'
              value={name}
              onChange={handleInputChange}
            />
            <Input
              type='email'
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
            <Input
              type='password'
              placeholder='Confirm Password'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={handleInputChange}
            />
            <Button
              btnColor='btn-primary'
              text={loading ? 'Creating...' : 'Register'}
              disable={loading}
            />
          </Form>
          {error && (
            <p className='d-flex justify-content-center text-danger mt-3 '>
              {error}
            </p>
          )}
        </div>
        <div className='d-flex justify-content-center'>
          <LinkRouter
            className='btn btn-danger mb-4'
            to='/auth/login'
            text='Already have an account?'
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;