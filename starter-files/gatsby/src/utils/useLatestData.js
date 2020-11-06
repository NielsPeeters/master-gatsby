import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

const useLatestData = () => {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // set state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      });
  }, []);

  return { hotSlices, sliceMasters };
};

export default useLatestData;
