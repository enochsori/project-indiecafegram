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
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  position: fixed;
  background-color: #fff;
  z-index: 10;

  z-index: 100;
`;
const ContentWrapper = styled.div`
  z-index: 90;
  background-color: #fff;
  position: fixed;
  height: 68px;
  width: 1450px;
`;
const Title = styled.span``;
const menuWrapper = styled.ul``;
