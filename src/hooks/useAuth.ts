import { useSelector } from '../services/store';
import { selectUser } from '../services/userSlice';

export const useAuth = () => {
  const { data, isAuthChecked } = useSelector(selectUser);

  return {
    isAuth: !!data,
    isAuthChecked
  };
};
