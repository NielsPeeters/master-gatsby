import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import OrderStyles from '../styles/OrderStyled';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

function OrderPage({ data }) {
  const { values, updateValue } = useForm({ name: '', email: '', maple: '' });
  const pizzas = data.pizzas.nodes;
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="order Pizza" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disable={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
            <input
              type="maple"
              name="maple"
              id="maple"
              value={values.maple}
              onChange={updateValue}
              className="maple"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu" disable={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disable={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disable={loading}>
          <legend>Total</legend>
          <h3>
            Your total is {formatMoney(calculateOrderTotal({ order, pizzas }))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default OrderPage;
