import styled from 'styled-components';

const Header = () => {
  return <Wrapper>Header</Wrapper>;
};
export default Header;

const Wrapper = styled.div`
  height: 100px;
  border-bottom: 1px solid red;
  position: sticky;
  top: 0;
  z-index: 100;
`;
