import { useState, useContext, useEffect } from 'react';
import Comment from './Comment';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';

const CommentsList = ({ _id }) => {
  const [comment, setComment] = useState(null);
  const { newComment, isSelected } = useContext(CafeContext);

  useEffect(() => {
    const fechData = async () => {
      const res = await fetch(`/api/comment/${_id}`);
      const { data } = await res.json();
      // console.log(data[0].comment);
      setComment(data[0].comment);
    };
    fechData();
  }, [_id]);
  console.log(_id);
  return (
    <Wrapper>
      {!comment ? (
        <div>Loading...</div>
      ) : (
        comment.map((review) => (
          <Comment key={Math.floor(Math.random() * 200000)} comment={review} />
        ))
      )}
    </Wrapper>
  );
};

export default CommentsList;

const Wrapper = styled.div``;
