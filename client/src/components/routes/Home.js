import { useJsApiLoader } from '@react-google-maps/api';
import { useContext, useState } from 'react';

import styled from 'styled-components';
import { CafeContext } from '../CafeContext';
import Map from '../map/Map';
import CafeDetail from '../sidebar/CafeDetail';
import Sidebar from '../sidebar/Sidebar';

const Home = () => {
  const { isSelected } = useContext(CafeContext);

  const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <Wrapper>
      {!isLoaded ? <span>Home loading..</span> : <Map />}
      {isSelected && <CafeDetail />}

      <LayoutSidebarAndMap>
        <Sidebar />
      </LayoutSidebarAndMap>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;
const LayoutSidebarAndMap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
