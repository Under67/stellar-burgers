import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: number | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
