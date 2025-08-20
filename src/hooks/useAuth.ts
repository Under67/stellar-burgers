import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { selectUser, fetchUser, refreshUser } from '../services/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(refreshUser()).finally(() => setIsAuthChecked(true));
    } else {
      dispatch(fetchUser()).finally(() => setIsAuthChecked(true));
    }
  }, [dispatch]);

  return {
    isAuth: !!user,
    isAuthChecked
  };
};
