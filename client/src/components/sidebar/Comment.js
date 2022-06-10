import { useContext } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';

const Comment = ({ comment }) => {
  const { newComment, setNewComment } = useContext(CafeContext);

  const key = Object.keys(comment)[0];
  const value = Object.values(comment)[0];
  return (
    <Wrapper>
      <Name>{key}</Name>
      <Review>{value}</Review>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.li`
  margin-bottom: 20px;
  border-bottom: 1px solid lightgray;
  list-style: none;
`;
const Name = styled.span`
  margin-right: 5px;
`;
const Review = styled.span`
  font-weight: bold;
`;
