import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse
} from '../utils/burger-api';
import { TOrder, TIngredient } from '../utils/types';
import { RootState } from './store';

interface UserOrdersState {
  orders: TOrder[];
  order: TOrder | null;
  isLoadingOrders: boolean;
  isLoadingOrder: boolean;
  isLoadingNewOrder: boolean;
  errorOrders: string | null;
  errorOrder: string | null;
  orderId: string | null;
  newOrder: string[];
  success: TOrder | null;
}

const initialState: UserOrdersState = {
  orders: [],
  order: null,
  isLoadingOrders: false,
  isLoadingOrder: false,
  isLoadingNewOrder: false,
  errorOrders: null,
  errorOrder: null,
  orderId: null,
  newOrder: [],
  success: null
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch {
      return rejectWithValue('Ошибка загрузки заказов пользователя');
    }
  }
);

export const fetchOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string }
>('orders/fetchOrder', async (order, { rejectWithValue }) => {
  try {
    const data = await orderBurgerApi(order);
    return data;
  } catch {
    return rejectWithValue('Ошибка, заказ не оформлен');
  }
});

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(id);
      return data;
    } catch {
      return rejectWithValue('Ошибка загрузки заказа');
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        const middleIngredients = state.newOrder.slice(1, -1);
        state.newOrder = [ingredient._id, ...middleIngredients, ingredient._id];
      } else {
        if (state.newOrder.length > 0) {
          state.newOrder.splice(state.newOrder.length - 1, 0, ingredient._id);
        } else {
          state.newOrder.push(ingredient._id);
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const index = state.newOrder.indexOf(action.payload);
      if (index !== -1) {
        state.newOrder.splice(index, 1);
      }
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= state.newOrder.length) return;

      const updated = [...state.newOrder];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      state.newOrder = updated;
    },

    clearOrder: (state) => {
      state.success = null;
    },
    clearModal: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoadingOrders = true;
        state.errorOrders = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isLoadingOrders = false;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.errorOrders = action.payload as string;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoadingOrder = true;
        state.errorOrder = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0] ?? null;
        state.isLoadingOrder = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.errorOrder = action.payload as string;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoadingNewOrder = true;
        state.errorOrder = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.newOrder = [];
        state.isLoadingNewOrder = false;
        state.success = action.payload.order;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoadingNewOrder = false;
        state.errorOrder = action.payload as string;
      });
  }
});

export const {
  setId,
  addIngredient,
  removeIngredient,
  clearOrder,
  moveIngredient,
  clearModal
} = ordersSlice.actions;
export default ordersSlice.reducer;
export const selectOrders = (state: RootState) => state.order.orders;
export const selectOrderId = (state: RootState) => state.order.orderId;
export const selectOrder = (state: RootState) => state.order.order;
export const selectNewOrder = (state: RootState) => state.order.newOrder;
export const selectIsLoadingOrders = (state: RootState) =>
  state.order.isLoadingOrders;
export const selectIsLoadingOrder = (state: RootState) =>
  state.order.isLoadingOrder;
export const selectIsLoadingNewOrder = (state: RootState) =>
  state.order.isLoadingNewOrder;
export const selectErrorOrders = (state: RootState) => state.order.errorOrders;
export const selectErrorOrder = (state: RootState) => state.order.errorOrder;
export const selectSuccess = (state: RootState) => state.order.success;
