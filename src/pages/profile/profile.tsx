import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserData, updateUser } from '../../services/userSlice';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  const data = useSelector(selectUserData) as TUser;
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: data.name || '',
    email: data.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: data?.name || '',
      email: data?.email || ''
    }));
  }, [data]);

  const isFormChanged =
    formValue.name !== data?.name ||
    formValue.email !== data?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
    setFormValue({
      name: data.name,
      email: data.email,
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: data.name,
      email: data.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
