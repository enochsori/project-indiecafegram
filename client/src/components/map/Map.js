import styled from 'styled-components';
import { useMemo, useState, useCallback, useContext } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { CafeContext } from '../CafeContext';

const Map = () => {
  const { geoCodes } = useContext(CafeContext);
  const [map, setMap] = useState(null);
  const center = useMemo(() => ({ lat: 45.501689, lng: -73.567256 }), []);
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  // console.log(geoCodes);

  const containerStyle = {
    width: '850px',
    height: '900px',
  };
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {geoCodes &&
          geoCodes.map((geoCode) => {
            console.log(geoCode);
            return (
              <Marker
                key={Math.floor(Math.random() * 400000)}
                position={geoCode}
              />
            );
          })}
        <Marker position={{ lat: 45.501689, lng: -73.567256 }} />
      </GoogleMap>
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  width: 850px;

  position: fixed;
  top: 70px;
`;
