import { useRef, useState, useContext, useEffect } from 'react';
import Comment from './Comment';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';

const CommentsList = ({ _id }) => {
  const [comment, setComment] = useState(null);
  const { newComment } = useContext(CafeContext);
  const scrollRef = useRef(null);

  // Get comments from db
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`/api/comment/${_id}`);
      const { data } = await res.json();
      setComment(data[0].comment);
    };
    getComments();
  }, [_id, newComment]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [_id, newComment]);

  return (
    <Wrapper>
      {!comment ? (
        <div>Loading...</div>
      ) : (
        comment.map((review) => (
          <div key={Math.floor(Math.random() * 200000)} ref={scrollRef}>
            <Comment
              key={Math.floor(Math.random() * 200000)}
              comment={review}
            />
          </div>
        ))
      )}
    </Wrapper>
  );
};

export default CommentsList;

const Wrapper = styled.div``;
