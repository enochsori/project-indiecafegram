import { useContext } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';

const Comment = ({ comment }) => {
  const { newComment, setNewComment } = useContext(CafeContext);

  const key = Object.keys(comment)[0];
  const value = Object.values(comment)[0];
  return (
    <Wrapper>
      <ContentWrapper>
        <Name>{key}</Name>
        <Review>{value}</Review>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.li`
  margin-bottom: 10px;
  list-style: none;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  height: 100%;
  background: #407088;
  color: #fff;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const Name = styled.span`
  margin-right: 5px;
`;
const Review = styled.span`
  font-weight: bold;
`;
