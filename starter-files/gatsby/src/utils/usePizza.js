import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

const usePizza = ({ pizzas, inputs }) => {
  // 1. create state to hold order
  const [order, setOrder] = useContext(OrderContext);

  // 2. func to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. func to remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // Everything before the item we want to remove
      ...order.slice(0, index),
      // Everything after the item we watn to remove
      ...order.slice(index + 1),
    ]);
  };
  // 4. Send this data to serverless func on checkout

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};
export default usePizza;
