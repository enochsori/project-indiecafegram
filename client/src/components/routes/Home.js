import { useJsApiLoader } from '@react-google-maps/api';

import styled from 'styled-components';
import Map from '../map/Map';

const Home = () => {
  const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  console.log(isLoaded);

  return <Wrapper>{!isLoaded ? <span>Home loading..</span> : <Map />}</Wrapper>;
};

export default Home;

const Wrapper = styled.div``;
