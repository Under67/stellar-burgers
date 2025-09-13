import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import { feedsSlice, FeedsState, fetchFeeds } from '../feedSlice';
import { mockFetchFeeds } from './mockData';

jest.mock('@api');

describe('feedSlice test', () => {
  let initialState: FeedsState;
  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: undefined
    };
  });
  test('fetchFeeds.pending', () => {
    const newState = feedsSlice.reducer(
      initialState,
      fetchFeeds.pending('', undefined)
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  }),
    test('fetchFeeds.rejected ', () => {
      const newState = feedsSlice.reducer(
        { ...initialState, isLoading: true },
        fetchFeeds.rejected(
          new Error('Ошибка загрузки ленты заказов'),
          '',
          undefined
        )
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('Ошибка загрузки ленты заказов');
    }),
    test('fetchFeeds.fulfilled', () => {
      const newState = feedsSlice.reducer(
        { ...initialState, isLoading: true },
        fetchFeeds.fulfilled(mockFetchFeeds, '', undefined)
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.orders).toBe(mockFetchFeeds.orders);
      expect(newState.total).toBe(mockFetchFeeds.total);
      expect(newState.totalToday).toBe(mockFetchFeeds.totalToday);
    });
});
