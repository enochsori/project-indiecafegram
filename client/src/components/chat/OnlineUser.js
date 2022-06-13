import styled from 'styled-components';

const OnlineUser = () => {
  return (
    <Wrapper>
      <OnlineUser>
        <AvatarWrapper>
          <UserAvatar></UserAvatar>
          <IsOnlineBadge></IsOnlineBadge>
        </AvatarWrapper>
        <Name>"Rony"</Name>
      </OnlineUser>
    </Wrapper>
  );
};

export default OnlineUser;

const Wrapper = styled.div``;
const OnlineUser = styled.div``;
const AvatarWrapper = styled.div``;
const UserAvatar = styled.div``;
const IsOnlineBadge = styled.div``;
const Name = styled.div``;
