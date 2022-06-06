import styled from 'styled-components';

const Sidebar = () => {
  return (
    <Wrapper>
      <ContentWrapper>Sidebar</ContentWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 30%;
  height: 100vh;
  position: relative;
  border: 1px solid blue;
`;

const ContentWrapper = styled.div`
  position: sticky;
  top: 100px;
  border: 1px solid blue;
`;
