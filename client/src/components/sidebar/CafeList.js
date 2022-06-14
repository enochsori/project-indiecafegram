import { useContext, useState } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';

const CafeList = ({ cafe, index }) => {
  const { name, address, imgSrc } = cafe;
  const {
    setIsSelected,
    setSelectedCafe,
    setCenter,

    geoCodes,
    setIsMouseOn,
  } = useContext(CafeContext);

  const displayDetailHandler = (event) => {
    if (name !== null) {
      setTimeout(() => {
        setIsSelected(true);
        setSelectedCafe(cafe);
      }, 250);
    }
  };

  return (
    <CafeListItem
      onMouseOver={() => {
        setCenter(geoCodes[index]);
      }}
      onClick={displayDetailHandler}
    >
      <ContentsWrapper>
        <Name>{name}</Name>
        <Address>{address}</Address>
      </ContentsWrapper>
      <ImageWrapper>
        <Image src={imgSrc} />
      </ImageWrapper>
    </CafeListItem>
  );
};

export default CafeList;

const CafeListItem = styled.li`
  position: relative;
  display: flex;
  height: 150px;
  border-bottom: 1px solid lightgray;
  justify-content: center;
  align-items: center;
  transition: all 100ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
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
  width: 25%;
  height: 65%;
  border-radius: 10px;
`;
const Name = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
`;
const LikesWrapper = styled.div``;
const Address = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;
const Image = styled.img`
  object-fit: cover;
`;
