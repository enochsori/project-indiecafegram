import styled from 'styled-components';

const Message = ({ user }) => {
  return (
    <Wrapper user={user ? true : false}>
      <MessageTop>
        <MessageImg user={user ? true : false}>EN</MessageImg>
        <MessageText user={user ? true : false}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        </MessageText>
      </MessageTop>
      <MessageTime>i hour ago</MessageTime>
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: ${(p) => (p.user ? `flex-end` : 'flex-start')};
`;

const MessageTop = styled.div`
  display: flex;
  align-items: center;
`;
// const r = Math.floor(Math.random() * 255);
// const g = Math.floor(Math.random() * 255);
// const b = Math.floor(Math.random() * 255);
// const a = Math.floor(Math.random());

const MessageImg = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(p) => (p.user ? 'blue' : 'red')};
  text-align: center;
  padding-top: 7px;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 10px;
`;
const MessageText = styled.p`
  padding: 15px;
  border-radius: 20px;
  background-color: ${(p) => (p.user ? `#e7eaf6` : '#1877f2')};
  color: ${(p) => (p.user ? `black` : '#fff')};
  max-width: 500px;
`;
const MessageTime = styled.div`
  font-size: 12px;
  margin: 10px;
`;
