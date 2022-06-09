import styled from 'styled-components';

const CafeList = ({ name, address, src }) => {
  return (
    <CafeListItem>
      <RightWrapper>
        <Name>{name}</Name>
        <LikesWrapper></LikesWrapper>
        <Address>{address}</Address>
      </RightWrapper>
      <LeftWrapper>
        <Image src={src} />
      </LeftWrapper>
    </CafeListItem>
  );
};

export default CafeList;

const CafeListItem = styled.li`
  display: flex;
  height: 120px;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  padding: 15px;
`;
const RightWrapper = styled.div`
  width: 75%;
`;
const LeftWrapper = styled.div`
  overflow: hidden;
  width: 20%;
  height: 95%;
  border-radius: 10px;
`;
const Name = styled.span``;
const LikesWrapper = styled.div``;
const Address = styled.span``;
const Image = styled.img``;
