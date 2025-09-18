import {
  fetchIngredients,
  ingredientsSlice,
  IngredientsState
} from '../ingredientsSlice';
import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import { mockFetchIngredients } from './mockData';

jest.mock('@api');

describe('ingredients test', () => {
  let initialState: IngredientsState;
  beforeEach(() => {
    initialState = ingredientsSlice.getInitialState();
  });
  test('fetchIngredients.pending', () => {
    const newState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  }),
    test('fetchIngredients.rejected ', () => {
      const newState = ingredientsSlice.reducer(
        { ...initialState, isLoading: true },
        fetchIngredients.rejected(
          new Error('Ошибка загрузки ингредиентов'),
          '',
          undefined
        )
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('Ошибка загрузки ингредиентов');
    }),
    test('fetchIngredients.fulfilled', () => {
      const newState = ingredientsSlice.reducer(
        { ...initialState, isLoading: true },
        fetchIngredients.fulfilled(mockFetchIngredients, '', undefined)
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.items).toBe(mockFetchIngredients);
    });
});
