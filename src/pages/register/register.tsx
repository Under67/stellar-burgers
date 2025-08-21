import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  registerUser,
  selectRegisterUserError,
  selectUserData
} from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registerUserError = useSelector(selectRegisterUserError);
  const data = useSelector(selectUserData);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    dispatch(registerUser({ email, name, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <RegisterUI
      errorText={registerUserError}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
