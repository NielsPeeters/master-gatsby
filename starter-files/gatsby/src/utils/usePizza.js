import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const usePizza = ({ pizzas, values }) => {
  // 1. create state to hold order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const submitOrder = async (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage(null);
    // Gather data to send
    const body = {
      order: attachNamesAndPrices({ order, pizzas }),
      total: formatMoney(calculateOrderTotal({ order, pizzas })),
      name: values.name,
      email: values.email,
      maple: values.maple,
    };

    // 4. Send this data to serverless func on checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    // Check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down for your pizza!');
    }
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
};
export default usePizza;
