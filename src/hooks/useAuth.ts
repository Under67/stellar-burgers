import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { fetchUser, refreshUser } from '../services/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        if (refreshToken) {
          await dispatch(refreshUser()).unwrap();
        }
        await dispatch(fetchUser()).unwrap();
      } catch {
        // Игнорируем ошибки, пользователь будет неавторизован
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  return { isAuth: isAuthenticated, isAuthChecked };
};
