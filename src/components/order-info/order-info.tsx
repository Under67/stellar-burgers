import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import {
  clearModal,
  fetchOrderByNumber,
  selectOrder,
  setId
} from '../../services/orderSlice';
import { useSelector } from 'react-redux';
import { ingredientItems } from '../../services/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderByNumber(Number(number)));
    dispatch(setId(number as string));
  }, [number]);
  const orderData = useSelector(selectOrder);
  const orderIngredients = useSelector(ingredientItems);
  const ingredients: TIngredient[] = orderIngredients.filter(
    (orderIngredient) => orderData?.ingredients.includes(orderIngredient._id)
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
