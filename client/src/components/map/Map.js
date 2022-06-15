import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { CafeContext } from '../CafeContext';

const Map = () => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);

  const { cafes, geoCodes, center, setCenter, setIsSelected, setSelectedCafe } =
    useContext(CafeContext);

  // Map style
  const containerStyle = {
    width: '850px',
    height: '700px',
  };

  // Dispay cafe detail when location maker clicked
  const onClickHandler = (index) => {
    setIsSelected(true);
    setSelectedCafe(cafes[index]);
  };

  useEffect(() => {
    setCenter({ lat: 45.501689, lng: -73.567256 });
    // cleanup
    return () => {
      setIsSelected(false);
    };
  }, []);

  return (
    <Wrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {geoCodes && (
          <Marker
            icon={{
              path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
              fillColor: 'blue',
              fillOpacity: 0.8,
              scale: 0.2,
              strokeColor: 'blue',
              strokeWeight: 3,
            }}
            position={center}
          />
        )}

        {geoCodes &&
          geoCodes.map((geoCode, index) => (
            <Marker
              key={Math.floor(Math.random() * 400000000)}
              position={geoCode}
              index={index}
              onClick={() => onClickHandler(index)}
            />
          ))}
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
