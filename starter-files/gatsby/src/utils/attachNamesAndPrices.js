import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const attachNamesAndPrices = ({ order, pizzas }) =>
  order.map((item) => {
    const pizza = pizzas.find((pizzaItem) => pizzaItem.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });

export default attachNamesAndPrices;
