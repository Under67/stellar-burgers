import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import {
  fetchUser,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  updateUser,
  userSlice
} from '../userSlice';
import { TUserState } from '@utils-types';
import {
  mockFetchUserResponse,
  mockLoginUser,
  mockLoginUserResponse,
  mockLogoutUserResponse,
  mockRefreshUserResponse,
  mockRegisterUser,
  mockRegisterUserResponse,
  mockUpdateUser,
  mockUpdateUserResponse
} from './mockData';

jest.mock('@api');

describe('userSlice test', () => {
  let initialState: TUserState;
  beforeEach(() => {
    initialState = userSlice.getInitialState();
  });
  beforeAll(() => {
    if (!global.document) {
      Object.defineProperty(global, 'document', {
        value: { cookie: '' },
        writable: true
      });
    } else {
      Object.defineProperty(global.document, 'cookie', {
        writable: true,
        value: ''
      });
    }

    // Мокаем localStorage один раз
    if (!global.localStorage) {
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn()
        },
        writable: true
      });
    }
  });

  test('loginUser.pending', () => {
    const newState = userSlice.reducer(
      initialState,
      loginUser.pending('', mockLoginUser)
    );
    expect(newState.loginUserRequest).toBe(true);
    expect(newState.loginUserError).toBeUndefined();
  }),
    test('loginUser.rejected ', () => {
      const newState = userSlice.reducer(
        { ...initialState, loginUserRequest: true },
        loginUser.rejected(
          new Error('Ошибка, сервер недоступен'),
          '',
          mockLoginUser
        )
      );
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.loginUserError).toBe('Ошибка, сервер недоступен');
      expect(newState.isAuthChecked).toBe(true);
    }),
    test('loginUser.fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState, loginUserRequest: true },
        loginUser.fulfilled(mockLoginUserResponse, '', mockLoginUser)
      );
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.data).toEqual(mockLoginUserResponse.user);
    }),
    test('registerUser.pending', () => {
      const newState = userSlice.reducer(
        initialState,
        registerUser.pending('', mockRegisterUser)
      );
      expect(newState.registerUserRequest).toBe(true);
      expect(newState.registerUserError).toBeUndefined();
    }),
    test('registerUser.rejected ', () => {
      const newState = userSlice.reducer(
        { ...initialState, registerUserRequest: true },
        registerUser.rejected(
          new Error('Ошибка, сервер недоступен'),
          '',
          mockRegisterUser
        )
      );
      expect(newState.registerUserRequest).toBe(false);
      expect(newState.registerUserError).toBe('Ошибка, сервер недоступен');
      expect(newState.isAuthChecked).toBe(true);
    }),
    test('registerUser.fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState, registerUserRequest: true },
        registerUser.fulfilled(mockRegisterUserResponse, '', mockRegisterUser)
      );
      expect(newState.registerUserRequest).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.data).toEqual(mockRegisterUserResponse.user);
    }),
    test('fetchUser.pending', () => {
      const newState = userSlice.reducer(
        initialState,
        fetchUser.pending('', undefined)
      );
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.data).toBeNull();
    }),
    test('fetchUser.rejected ', () => {
      const newState = userSlice.reducer(
        initialState,
        fetchUser.rejected(
          new Error('Ошибка при получении пользователя'),
          '',
          undefined
        )
      );
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.data).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
    }),
    test('fetchUser.fulfilled', () => {
      const newState = userSlice.reducer(
        initialState,
        fetchUser.fulfilled(mockFetchUserResponse.user, '', undefined)
      );
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.data).toEqual(mockFetchUserResponse.user);
    }),
    test('refreshUser.pending', () => {
      const newState = userSlice.reducer(
        initialState,
        refreshUser.pending('', undefined)
      );
      expect(newState.refreshUserRequest).toBe(true);
      expect(newState.refreshUserError).toBeUndefined();
    }),
    test('refreshUser.rejected ', () => {
      const newState = userSlice.reducer(
        { ...initialState, refreshUserRequest: true },
        refreshUser.rejected(
          new Error('Ошибка обновления токена'),
          '',
          undefined
        )
      );
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.refreshUserRequest).toBe(false);
      expect(newState.refreshUserError).toBe('Ошибка обновления токена');
    }),
    test('refreshUser.fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState, refreshUserRequest: true },
        refreshUser.fulfilled(mockRefreshUserResponse, '', undefined)
      );
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.refreshUserRequest).toBe(false);
    }),
    test('logoutUser.rejected ', () => {
      const newState = userSlice.reducer(
        initialState,
        logoutUser.rejected(
          new Error('Ошибка при выходе из системы'),
          '',
          undefined
        )
      );
      expect(newState.isAuthChecked).toBe(true);
    }),
    test('logoutUser.fulfilled', () => {
      const newState = userSlice.reducer(
        initialState,
        logoutUser.fulfilled(mockLogoutUserResponse, '', undefined)
      );
      expect(newState.data).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
    }),
    test('updateUser.rejected ', () => {
      const newState = userSlice.reducer(
        initialState,
        updateUser.rejected(
          new Error('Ошибка при обновлении пользователя'),
          '',
          mockUpdateUser
        )
      );
      expect(newState.loginUserError).toBe(
        'Ошибка при обновлении пользователя'
      );
    }),
    test('updateUser.fulfilled', () => {
      const newState = userSlice.reducer(
        initialState,
        updateUser.fulfilled(mockUpdateUserResponse.user, '', mockUpdateUser)
      );
      expect(newState.data).toEqual(mockUpdateUserResponse.user);
    });
});
