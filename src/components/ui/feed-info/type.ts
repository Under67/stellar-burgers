import { TOrder } from '@utils-types';
import { FeedsState } from 'src/services/feedSlice';

export type FeedInfoUIProps = {
  feed: FeedsState;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
