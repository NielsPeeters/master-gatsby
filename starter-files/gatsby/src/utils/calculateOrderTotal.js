import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = ({ order, pizzas }) =>
  // 1. Loop over each item in the calculateOrderTotal
  order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((pizzaItem) => pizzaItem.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);

export default calculateOrderTotal;
