import ordersSliceReducer, {
  addIngredient,
  fetchOrder,
  fetchOrderByNumber,
  fetchUserOrders,
  moveIngredient,
  ordersSlice,
  removeIngredient,
  UserOrdersState
} from '../orderSlice';
import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import {
  mockFetchOrder,
  mockFetchOrderByNumberId,
  mockFetchResponseOrder,
  mockFetchResponseOrderByNumber,
  mockFetchUserOrders
} from './mockData';

jest.mock('@api');

describe('actions test', () => {
  let initialState: UserOrdersState;
  beforeEach(() => {
    initialState = ordersSlice.getInitialState();
  });
  describe('synchronous actions', () => {
    test('addIngredient', () => {
      const newState = ordersSliceReducer(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        })
      );
      const { newOrder } = newState;
      expect(newOrder).toEqual([
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c'
      ]);
    });
    test('addIngredient double bun', () => {
      let newState = ordersSliceReducer(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        })
      );
      newState = ordersSliceReducer(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        })
      );

      const { newOrder } = newState;
      expect(newOrder).toEqual([
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ]);
    });
    test('moveIngredient up', () => {
      const initialNewOrder = [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ];
      const stateWithIngredients: UserOrdersState = {
        ...initialState,
        newOrder: [...initialNewOrder]
      };
      const newState = ordersSliceReducer(
        stateWithIngredients,
        moveIngredient({
          burgerId: '643d69a5c3f7b9001cfa093e',
          direction: 'up'
        })
      );
      const { newOrder } = newState;
      expect(newOrder).toEqual([
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ]);
    });
    test('moveIngredient down', () => {
      const initialNewOrder = [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ];
      const stateWithIngredients: UserOrdersState = {
        ...initialState,
        newOrder: [...initialNewOrder]
      };
      const newState = ordersSliceReducer(
        stateWithIngredients,
        moveIngredient({
          burgerId: '643d69a5c3f7b9001cfa093e',
          direction: 'down'
        })
      );
      const { newOrder } = newState;
      expect(newOrder).toEqual([
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ]);
    });
    test('removeIngredient', () => {
      const initialNewOrder = [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ];
      const stateWithIngredients: UserOrdersState = {
        ...initialState,
        newOrder: [...initialNewOrder]
      };
      const newState = ordersSliceReducer(
        stateWithIngredients,
        removeIngredient('643d69a5c3f7b9001cfa093e')
      );
      const { newOrder } = newState;
      expect(newOrder).toEqual([
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ]);
    });
  });
  describe('asynchronous actions', () => {
    test('fetchUserOrders.pending', () => {
      const newState = ordersSliceReducer(
        initialState,
        fetchUserOrders.pending('', undefined)
      );
      expect(newState.isLoadingOrders).toBe(true);
      expect(newState.errorOrders).toBeUndefined();
    }),
      test('fetchUserOrders.rejected ', () => {
        const newState = ordersSliceReducer(
          { ...initialState, isLoadingOrders: true },
          fetchUserOrders.rejected(
            new Error('Ошибка загрузки заказов пользователя'),
            '',
            undefined
          )
        );
        expect(newState.isLoadingOrders).toBe(false);
        expect(newState.errorOrders).toBe(
          'Ошибка загрузки заказов пользователя'
        );
      }),
      test('fetchUserOrders.fulfilled', () => {
        const newState = ordersSliceReducer(
          { ...initialState, isLoadingOrders: true },
          fetchUserOrders.fulfilled(mockFetchUserOrders, '', undefined)
        );
        expect(newState.isLoadingOrders).toBe(false);
        expect(newState.orders).toBe(mockFetchUserOrders);
      }),
      test('fetchOrder.pending', () => {
        const newState = ordersSliceReducer(
          initialState,
          fetchOrder.pending('', mockFetchOrder)
        );
        expect(newState.isLoadingNewOrder).toBe(true);
        expect(newState.errorOrder).toBeUndefined();
      }),
      test('fetchOrder.rejected ', () => {
        const newState = ordersSliceReducer(
          { ...initialState, isLoadingOrders: true },
          fetchOrder.rejected(
            new Error('Ошибка, заказ не оформлен'),
            '',
            mockFetchOrder
          )
        );
        expect(newState.isLoadingNewOrder).toBe(false);
        expect(newState.errorOrder).toBe('Ошибка, заказ не оформлен');
      });
    test('fetchOrder.fulfilled', () => {
      const newState = ordersSliceReducer(
        { ...initialState, isLoadingOrders: true },
        fetchOrder.fulfilled(mockFetchResponseOrder, '', mockFetchOrder)
      );
      expect(newState.isLoadingNewOrder).toBe(false);
      expect(newState.success).toBe(mockFetchResponseOrder.order.number);
      expect(newState.newOrder).toEqual([]);
    }),
      test('fetchOrderByNumber.pending', () => {
        const newState = ordersSliceReducer(
          initialState,
          fetchOrderByNumber.pending('', mockFetchOrderByNumberId)
        );
        expect(newState.isLoadingOrder).toBe(true);
        expect(newState.errorOrder).toBeUndefined();
      }),
      test('fetchOrderByNumber.rejected ', () => {
        const newState = ordersSliceReducer(
          { ...initialState, isLoadingOrders: true },
          fetchOrderByNumber.rejected(
            new Error('Ошибка загрузки заказа'),
            '',
            mockFetchOrderByNumberId
          )
        );
        expect(newState.isLoadingOrder).toBe(false);
        expect(newState.errorOrder).toBe('Ошибка загрузки заказа');
      });
    test('fetchOrderByNumber.fulfilled', () => {
      const newState = ordersSliceReducer(
        { ...initialState, isLoadingOrder: true },
        fetchOrderByNumber.fulfilled(
          mockFetchResponseOrderByNumber,
          '',
          mockFetchOrderByNumberId
        )
      );
      expect(newState.isLoadingOrder).toBe(false);
      expect(newState.order).toEqual(mockFetchResponseOrderByNumber.orders[0]);
    });
  });
});
