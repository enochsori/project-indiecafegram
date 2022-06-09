import { useContext } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';
import CafeList from './CafeList';

const Sidebar = () => {
  const { cafes } = useContext(CafeContext);

  return (
    <Wrapper>
      <ContentWrapper>
        {cafes ? (
          cafes.map((cafe) => {
            return (
              <CafeList
                key={cafe._id}
                name={cafe.name}
                address={cafe.address}
                src={cafe.imgSrc}
              />
            );
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
  width: 30%;
  height: 100vh;
  margin-top: 70px;
`;

const ContentWrapper = styled.ul`
  top: 70px;
`;
