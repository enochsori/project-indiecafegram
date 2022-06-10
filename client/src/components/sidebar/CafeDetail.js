import { useContext } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';
import Comment from './Comment';
const CafeDetail = () => {
  const { selectedCafe, setIsSelected, setSelectedCafe } =
    useContext(CafeContext);

  const { _id, name, address, imgSrc, phone, webSite, comment } = selectedCafe;

  const closeHandler = () => {
    setIsSelected(false);
    setSelectedCafe(false);
  };
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={imgSrc} />
      </ImageWrapper>
      <ContentsWrapper>
        <Name>{name}</Name>
        <Address>{address}</Address>
        <Phone>{phone}</Phone>
        <CloseButton onClick={closeHandler}>X</CloseButton>
        <CommentWrapper>
          {comment.length > 1 &&
            comment.map((com) => <Comment key={_id} userComment={com} />)}
        </CommentWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
};

export default CafeDetail;

const Wrapper = styled.div`
  border-radius: 10px;
  width: 430px;
  height: 800px;
  position: fixed;
  top: 80px;
  left: 38%;
  transform: translateX(5%);
  z-index: 100;
  border-radius: 10px;
  background: #f8f8f8;
`;

const ImageWrapper = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 30%;
  overflow: hidden;
  margin-bottom: 15px;
`;
const Image = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ContentsWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

const Name = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;
const Address = styled.span``;
const Phone = styled.span``;
const Web = styled.span``;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border: none;
  font-size: 1.2rem;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 200ms ease-in;
  &: hover {

  }
`;
const CommentWrapper = styled.div`
  border: 1px solid blue;
  display: flex;
  height: 400px;
`;
