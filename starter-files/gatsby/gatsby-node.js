import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. Get template for this Pizza
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all Pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the url for this new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: `${pizza.slug.current}`,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  // 1. Get the templates
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. create page for topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the url for this new page
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Loop over all toppings
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // 1. fetch a list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    // 3. Create a node for beers
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({ ...beer, ...nodeMeta });
  }
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  // 1. Query all Slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. Turn each slicemaster into their own pages
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: resolve('./src/templates/Slicemaster.js'),
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages there are based on the amount of slicemasters
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE, 10);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4. loop from 1 to n  and create the pages
  Array.from({ length: pageCount }).forEach((_, index) => {
    actions.createPage({
      path: `/slicemasters/${index + 1}`,
      component: resolve('./src/pages/slicemasters.js'),
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize,
      },
    });
  });
};

export const sourceNodes = async (params) => {
  // 1. fetch a list of beers and source them into our gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export const createPages = async (params) => {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
};
