import styled from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Indicafegram</Title>
      </ContentWrapper>
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
`;
const ContentWrapper = styled.div`
  width: 1450px;
  border: 1px solid black;
`;
const Title = styled.span``;
const menuWrapper = styled.ul``;
