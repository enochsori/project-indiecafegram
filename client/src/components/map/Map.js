import styled from 'styled-components';
import { useState, useCallback, useContext } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { CafeContext } from '../CafeContext';

const Map = () => {
  const { geoCodes, center } = useContext(CafeContext);

  console.log(geoCodes);

  const containerStyle = {
    width: '850px',
    height: '700px',
  };

  const onMouseOverHandler = () => {};
  const onClickHandler = () => {};

  const icon = {
    path: 'M 100 100 L 300 100 L 200 300 z',
    fillColor: 'red',
    strokeColor: 'blue',
    strokeWidth: 3,
  };

  return (
    <Wrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {geoCodes &&
          geoCodes.map((geoCode, index) => {
            return (
              <Marker
                key={Math.floor(Math.random() * 400000000)}
                position={geoCode}
                index={index}
                onMouseOver={onMouseOverHandler}
                onClick={onClickHandler}
              />
            );
          })}
        <Marker
          icon={{
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: 'yellow',
            fillOpacity: 0.8,
            scale: 0.3,
            strokeColor: 'gold',
            strokeWeight: 14,
          }}
          position={center}
        />
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
