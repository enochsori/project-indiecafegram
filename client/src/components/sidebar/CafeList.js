import styled from 'styled-components';

const CafeList = ({ name, address }) => {
  return (
    <CafeListItem>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </CafeListItem>
  );
};

export default CafeList;

const CafeListItem = styled.li``;
const Name = styled.span``;
const LikesWrapper = styled.div``;
const Address = styled.span``;
const Image = styled.img``;
