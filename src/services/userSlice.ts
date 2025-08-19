import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  refreshToken,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TServerResponse,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TUserState } from '@utils-types';
import { setCookie } from '../utils/cookie';
import { RootState } from './store';

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: undefined,
  loginUserRequest: false,
  registerUserError: undefined,
  registerUserRequest: false
};

export const loginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await loginUserApi({ email, password });
    if (!data.success)
      return rejectWithValue(data.message || 'Ошибка авторизации');
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка, сервер недоступен');
  }
});

export const registerUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>(
  'user/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const data = await registerUserApi({ email, password, name });
      if (!data.success)
        return rejectWithValue(data.message || 'Ошибка регистрации');
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Ошибка, сервер недоступен');
    }
  }
);

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      if (!data.success)
        return rejectWithValue(data.message || 'Ошибка получения пользователя');
      return data.user;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || 'Ошибка при получении пользователя'
      );
    }
  }
);

export const refreshUser = createAsyncThunk<
  TAuthResponse,
  void,
  { rejectValue: string }
>('user/refreshUser', async (_, { rejectWithValue }) => {
  try {
    const data = await refreshToken();
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка обновления токена');
  }
});

export const logoutUser = createAsyncThunk<
  TServerResponse<{}>,
  void,
  { rejectValue: string }
>('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const data = await logoutApi();
    if (!data.success)
      return rejectWithValue(data.message || 'Ошибка выхода из системы');
    return data;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка при выходе из системы');
  }
});

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const data = await updateUserApi(userData);
    if (!data.success)
      return rejectWithValue(data.message || 'Ошибка обновления пользователя');
    return data.user;
  } catch (error: any) {
    return rejectWithValue(
      error?.message || 'Ошибка при обновлении пользователя'
    );
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user as TUser;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload ?? 'Неизвестная ошибка';
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user as TUser;
        state.registerUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserRequest = false;
        state.registerUserError = action.payload ?? 'Неизвестная ошибка';
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.data = action.payload.user as TUser;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        document.cookie = 'accessToken=; Max-Age=0';
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError = action.payload ?? 'Неизвестная ошибка';
      });
  }
});

export const { setUser } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;
export const selectLoginUserError = (state: RootState) =>
  state.user.loginUserError;
export const selectRegisterUserError = (state: RootState) =>
  state.user.registerUserError;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
