import { useContext } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';

const Conversation = ({ conversation }) => {
  const { name, imgSrc } = conversation;
  return (
    <Wrapper>
      <CafeImg src={imgSrc} />
      <CafeName>{name}</CafeName>
    </Wrapper>
  );
};

export default Conversation;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: rgb(245, 243, 243);
  }
`;
const CafeImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const CafeName = styled.span`
  font-weight: bolder;
  font-size: 1.2rem;
`;
