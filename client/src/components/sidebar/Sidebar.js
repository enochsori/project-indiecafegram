import { useContext } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';
import CafeList from './CafeList';

const Sidebar = () => {
  const { cafes } = useContext(CafeContext);
  console.log(cafes);

  return (
    <Wrapper>
      <ContentWrapper>
        {cafes ? (
          cafes.map((cafe) => {
            return <CafeList name={cafe.name} address={cafe.address} />;
          })
        ) : (
          <div>Loading...</div>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 40%;
  height: 100vh;
  position: relative;
  border: 1px solid blue;
`;

const ContentWrapper = styled.ul`
  position: sticky;
  top: 70px;
  border: 1px solid blue;
`;
