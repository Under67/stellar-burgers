import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientItems } from '../../services/ingredientsSlice';
import {
  clearOrder,
  fetchOrder,
  selectIsLoadingNewOrder,
  selectNewOrder,
  selectSuccess
} from '../../services/orderSlice';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const Ingredients = useSelector(ingredientItems);
  const newOrder = useSelector(selectNewOrder);
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const constructorItems = useMemo(() => {
    const bunId = newOrder.find((id) => {
      const ingredient = Ingredients.find((i) => i._id === id);
      return ingredient?.type === 'bun';
    });

    const bun =
      Ingredients.find((i) => i._id === bunId && i.type === 'bun') || null;

    const ingredients: TIngredient[] = newOrder
      .filter((id) => id !== bunId)
      .map((id) => Ingredients.find((i) => i._id === id))
      .filter((i): i is TIngredient => i !== undefined);

    return { bun, ingredients };
  }, [newOrder, Ingredients]);

  const orderRequest = useSelector(selectIsLoadingNewOrder);
  const orderModalData = useSelector(selectSuccess);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) return navigate('/login');
    dispatch(fetchOrder(newOrder));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TIngredient) => sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
