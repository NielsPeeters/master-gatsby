import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import OrderStyles from '../styles/OrderStyled';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import MenuItemStyles from '../styles/MenuItemStyles';

function OrderPage({ data }) {
  const { values, updateValue } = useForm({ name: '', email: '' });
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO title="order Pizza" />
      <OrderStyles>
        <form action="">
          <fieldset>
            <legend>Your info</legend>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={updateValue}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={updateValue}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Menu</legend>
            {pizzas.map((pizza) => (
              <MenuItemStyles key={pizza.id}>
                <Img width="50" height="50" fluid={pizza.image.asset.fluid} />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {['S', 'M', 'L'].map((size) => (
                    <button type="button">
                      {size}{' '}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </MenuItemStyles>
            ))}
          </fieldset>
          <fieldset>
            <legend>Order</legend>
          </fieldset>
        </form>
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
