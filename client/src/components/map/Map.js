import styled from 'styled-components';
import { useMemo, useState, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = () => {
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const center = useMemo(() => ({ lat: 45.501689, lng: -73.567256 }), []);

  const containerStyle = {
    width: '100%',
    height: '1000px',
  };
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <Marker position={center} /> */}
    </GoogleMap>
  );
};

export default Map;

const StyledMarker = styled(Marker)`
  font-size: 200px;
`;
