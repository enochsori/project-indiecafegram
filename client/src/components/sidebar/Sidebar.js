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
          cafes.map((cafe, index) => {
            return <CafeList index={index} key={cafe._id} cafe={cafe} />;
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
  width: 29%;
  height: 100vh;
  margin-top: 70px;
`;

const ContentWrapper = styled.ul`
  top: 70px;
`;
