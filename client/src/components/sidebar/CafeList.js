import styled from 'styled-components';

const CafeList = ({ name, address, src }) => {
  return (
    <CafeListItem>
      <ContentsWrapper>
        <Name>{name}</Name>
        <Address>{address}</Address>
      </ContentsWrapper>
      <ImageWrapper>
        <Image src={src} />
      </ImageWrapper>
    </CafeListItem>
  );
};

export default CafeList;

const CafeListItem = styled.li`
  display: flex;
  height: 150px;
  border-bottom: 1px solid lightgray;
  justify-content: center;
  align-items: center;
  transition: all 100ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
`;
const ContentsWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  width: 20%;
  height: 65%;
  border-radius: 10px;
`;
const Name = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;
const LikesWrapper = styled.div``;
const Address = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;
const Image = styled.img``;
