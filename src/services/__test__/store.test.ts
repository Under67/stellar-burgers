import store, { rootReducer } from '../store';
import { userSlice } from '../userSlice';
import { ingredientsSlice } from '../ingredientsSlice';
import { feedsSlice } from '../feedSlice';
import { ordersSlice } from '../orderSlice';

describe('rootReducer initialization', () => {
  test('store создаётся с правильной структурой', () => {
    const state = store.getState();

    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('ingredient');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
  });

  test('каждая ветка инициализируется своим initialState', () => {
    const state = store.getState();

    expect(state.user).toEqual(userSlice.getInitialState());
    expect(state.ingredient).toEqual(ingredientsSlice.getInitialState());
    expect(state.feed).toEqual(feedsSlice.getInitialState());
    expect(state.order).toEqual(ordersSlice.getInitialState());
  }),
    test('rootReducer', () => {
      const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
      expect(state.user).toEqual(userSlice.getInitialState());
      expect(state.ingredient).toEqual(ingredientsSlice.getInitialState());
      expect(state.feed).toEqual(feedsSlice.getInitialState());
      expect(state.order).toEqual(ordersSlice.getInitialState());
    });
});
