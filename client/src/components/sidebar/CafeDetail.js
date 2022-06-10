import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CafeContext } from '../CafeContext';
import { UserContext } from '../UserContext';
import CommentsList from './CommentsList';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { MdOutlineCancelPresentation } from 'react-icons/md';

const CafeDetail = () => {
  const {
    selectedCafe,
    isSelected,
    setIsSelected,
    setSelectedCafe,
    newComment,
    setNewComment,
  } = useContext(CafeContext);
  const [userInput, setUserInput] = useState(null);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const { _id, name, address, imgSrc, phone, webSite } = selectedCafe;

  const { currentUser } = useContext(UserContext);
  if (currentUser) {
    console.log(currentUser);
  }

  const closeHandler = () => {
    setIsSelected(false);
    setSelectedCafe(false);
  };
  const updateCommentFetch = async () => {
    // console.log(newComment);
    try {
      const res = await fetch('/api/add-comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser[0]._id,
          name: currentUser[0]._name,
          newComment,
          cafeId: _id,
        }),
      });
      const result = res.json();
      console.log(result);
      setNewComment(result);
    } catch (err) {
      window.alert(err);
    }
  };

  const newCommentHandler = (event) => {
    event.preventDefault();
    // console.log(newComment);
    // Call a function to fetch updating new comment
    updateCommentFetch();
    // event.target.value = '';
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
      </ContentsWrapper>

      <StyledMdOutlineCancelPresentation onClick={closeHandler} />

      <CommentWrapper>
        <CommentsList _id={_id} />
      </CommentWrapper>
      <NewCommentForm>
        <CommentInput
          ref={inputRef}
          type='text'
          placeholder='Leave your comment'
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
        />

        <StyledBsFillArrowUpCircleFill onSubmit={newCommentHandler} />
      </NewCommentForm>
    </Wrapper>
  );
};

export default CafeDetail;

const Wrapper = styled.div`
  border-radius: 10px;
  width: 430px;
  height: 600px;
  position: fixed;
  top: 80px;
  left: 38%;
  transform: translateX(5%);
  z-index: 100;
  border-radius: 10px;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 20%;
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
`;

const Name = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;
const Address = styled.span``;
const Phone = styled.span``;
const Web = styled.span``;

const StyledMdOutlineCancelPresentation = styled(MdOutlineCancelPresentation)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.2rem;
  border-radius: 20%;
  height: 35px;
  width: 35px;
  color: #f8f8f8;
  cursor: pointer;
  transition: all 200ms ease-in;
  &:hover {
    color: black;
    font-size: 1.4rem;
  }
`;
const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow: scroll;
  padding: 15px;
`;

const NewCommentForm = styled.form`
  position: relative;
  margin-bottom: 5px;
  padding: 15px;
  display: flex;
  justify-content: center;
`;
const CommentInput = styled.input`
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 0 5px;
`;
const StyledBsFillArrowUpCircleFill = styled(BsFillArrowUpCircleFill)`
  cursor: pointer;
  border: none;
  border-radius: 30%;
  font-size: 1.5rem;
  height: 2rem;
  width: 2rem;
  color: #2470a0;
  position: absolute;
  right: 20px;
  top: 19px;
  transition: all 200ms ease-in;
  &:hover {
    color: #1dad9b;
  }
`;