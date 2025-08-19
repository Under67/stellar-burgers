import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
import { selectNewOrder } from '../../services/orderSlice';
import { ingredientItems } from '../../services/ingredientsSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const newOrder = useSelector(selectNewOrder);
  const allIngredients = useSelector(ingredientItems);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    newOrder.forEach((id) => {
      if (!counters[id]) counters[id] = 0;
      counters[id]++;
    });

    const bun = allIngredients.find(
      (i) => i.type === 'bun' && newOrder.includes(i._id)
    );
    if (bun) counters[bun._id] = 2;

    return counters;
  }, [newOrder, allIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
