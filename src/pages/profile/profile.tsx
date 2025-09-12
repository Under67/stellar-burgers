import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserData, updateUser } from '../../services/userSlice';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  const data = useSelector(selectUserData) as TUser | null;
  const dispatch = useDispatch();

  // Дефолтные значения на случай, если data еще нет
  const initialFormValue = {
    name: data?.name || '',
    email: data?.email || '',
    password: ''
  };

  const [formValue, setFormValue] = useState(initialFormValue);

  useEffect(() => {
    if (data) {
      setFormValue({
        name: data.name,
        email: data.email,
        password: ''
      });
    }
  }, [data]);

  const isFormChanged =
    formValue.name !== (data?.name || '') ||
    formValue.email !== (data?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data) return; // безопасная проверка
    dispatch(updateUser(formValue));
    setFormValue({
      name: data.name,
      email: data.email,
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data) return; // безопасная проверка
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
