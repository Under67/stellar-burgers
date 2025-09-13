import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { fetchUser, refreshUser } from '../services/userSlice';
import { getCookie } from '../utils/cookie';

let authCheckedGlobal = false;

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (authCheckedGlobal) return;
    authCheckedGlobal = true;

    const checkAuth = async () => {
      try {
        const accessToken = getCookie('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken) {
          // Есть действующий accessToken → просто fetchUser
          await dispatch(fetchUser()).unwrap();
        } else if (refreshToken) {
          // Нет accessToken → обновляем
          await dispatch(refreshUser()).unwrap();
          await dispatch(fetchUser()).unwrap();
        }
        // Если нет токенов — не делаем ничего, пользователь не авторизован
      } catch {
        // Игнорируем ошибки
      }
    };

    checkAuth();
  }, [dispatch]);

  return { isAuth: isAuthenticated, isAuthChecked: true };
};
