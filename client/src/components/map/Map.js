import styled from 'styled-components';
import { useMemo, useState, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = () => {
  const [map, setMap] = useState(null);
  const center = useMemo(() => ({ lat: 45.501689, lng: -73.567256 }), []);
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const containerStyle = {
    width: '900px',
    height: '1000px',
  };
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  width: 900px;
  position: fixed;
  top: 70px;
`;
