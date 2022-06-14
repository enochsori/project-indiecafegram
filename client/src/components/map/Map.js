import styled from 'styled-components';
import { useState, useCallback, useContext } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { CafeContext } from '../CafeContext';

const Map = () => {
  const { geoCodes, center, isMouseOn } = useContext(CafeContext);
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  console.log(geoCodes);
  console.log(center);

  const containerStyle = {
    width: '850px',
    height: '700px',
  };
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  {
    /* <Wrapper>map page</Wrapper>; */
  }

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        //
        onUnmount={onUnmount}
      >
        {geoCodes &&
          geoCodes.map((geoCode, index) => {
            return (
              <Marker
                key={Math.floor(Math.random() * 400000000)}
                position={geoCode}
                index={index}
              />
            );
          })}
      </GoogleMap>
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  width: 850px;
  height: 950px;
  position: fixed;
  top: 70px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
