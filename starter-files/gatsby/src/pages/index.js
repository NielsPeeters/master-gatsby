import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ sliceMasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters On</span>
    </h2>
    <p>Standing by ready to slice you up</p>
    {!sliceMasters && <LoadingGrid count="4" />}
    {sliceMasters && !sliceMasters?.length && (
      <p>No one is working right now.</p>
    )}
    {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>C'mon buy a slice</p>
    {!hotSlices && <LoadingGrid count="4" />}
    {hotSlices && !hotSlices?.length && <p>Nothing in the case.</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);

const HomePage = () => {
  const { hotSlices, sliceMasters } = useLatestData();
  return (
    <>
      <div className="center">
        <h1>Best pizza downtown</h1>
        <p>Open 11am to 11pm Every single day</p>
        <HomePageGrid>
          <CurrentlySlicing sliceMasters={sliceMasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
};

export default HomePage;
