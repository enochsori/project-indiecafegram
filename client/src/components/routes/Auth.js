import styled from 'styled-components';
import { useState, useRef, useEffect, useContext } from 'react';

import { UserContext } from '../UserContext';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { FcGoogle } from 'react-icons/fc';
import { AiOutlineTwitter } from 'react-icons/ai';
import { AiOutlineGithub } from 'react-icons/ai';
import cafe from '../../images/cafe.jpeg';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const { setNewUser, setIsLoggedIn } = useContext(UserContext);

  const auth = getAuth();

  // Focus on the first input element to draw user's attention
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const isSignupToggleHandler = () => {
    setIsSignup(!isSignup);
  };

  // **************************************
  // Basic functions for Authentication

  // **************************************

  // User state handler to check if a user logged in or not

  const signupHandler = async (event) => {
    // When new user sign up, firebase auth. graps user's info and save it inside its own db
    // Apart from that, we will grap user info to use our own db
    // And when user successfully sign up, the user will be logged in automatically.
    event.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setNewUser({ name, email, _id: result.user.uid });
      // Save user id into session storage for keeping user login state
      await window.sessionStorage.setItem('userId', result.user.uid);

      // Change Login state
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    } catch (err) {
      window.alert(err.code);
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      // Firebase auth. checks user validation. (is member?)
      const result = await signInWithEmailAndPassword(auth, email, password);
      await window.sessionStorage.setItem('userId', result.user.uid);

      // Change Login state
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          setIsLoggedIn(true);
        }
      });
    } catch (err) {
      setIsLoggedIn(false);
      isSignupToggleHandler();
    }
  };

  return (
    <Modalwrapper>
      <ModalBackground>
        <Wrapper>
          <LoginPageImage src={cafe} />

          <LogincontentWrapper>
            <Form onSubmit={isSignup ? loginHandler : signupHandler}>
              <CaptionForGreeting>
                welcome to timesand watches
              </CaptionForGreeting>

              {isSignup && (
                <OptionsWrapper>
                  <CaptionForLogin>Log in to continue</CaptionForLogin>

                  <CaptionForRegister> Not member yet? </CaptionForRegister>
                  <Register onClick={isSignupToggleHandler}>
                    Register now
                  </Register>
                </OptionsWrapper>
              )}
              {!isSignup && (
                <InputName
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder='Name'
                  type='text'
                  required
                />
              )}

              <InputForEmail
                ref={inputRef}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
                type='email'
                placeholder='Email'
              />

              <InputForPassword
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                type='password'
                placeholder='Password'
              />
              <SubmitButton>
                {isSignup ? 'login now' : 'Sign up now'}
              </SubmitButton>
            </Form>

            <OtherOptionTile>
              {' '}
              ---------------- or ----------------{' '}
            </OtherOptionTile>
            <OtherOptionWrapper>
              <ViaGoogle>
                <FcGoogle />
                <GoogleTitle>Google</GoogleTitle>
              </ViaGoogle>

              <ViaTwitter>
                <StyledAiOutlineTwitter />
                <TwitterTitle>Twitter</TwitterTitle>
              </ViaTwitter>

              <ViaGithub>
                <AiOutlineGithub />
                <GithubTitle>GitHub</GithubTitle>
              </ViaGithub>
            </OtherOptionWrapper>
          </LogincontentWrapper>
        </Wrapper>
      </ModalBackground>
    </Modalwrapper>
  );
};

export default Auth;

const Modalwrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 1360px;
  height: 100vh;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const Wrapper = styled.div`
  margin-top: 200px;
  background: #dfebed;
  width: 800px;
  height: 500px;
  display: flex;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;

const LoginPageImage = styled.img`
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const LogincontentWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CaptionForGreeting = styled.span`
  text-transform: uppercase;
  color: gray;
  margin-bottom: 50px;
  font-size: 0.8rem;
`;
const OptionsWrapper = styled.div`
  margin-bottom: 20px;
`;
const CaptionForLogin = styled.span`
  margin-right: 10px;
  font-weight: 800;
  font-size: 0.8rem;
`;
const CaptionForRegister = styled.span`
  font-size: 0.8rem;
  margin-right: 5px;
`;
const Register = styled.span`
  color: darkgray;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    color: #79c2d0;
  }
`;

const InputName = styled.input`
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  height: 35px;
  width: 18rem;
`;

const InputForEmail = styled.input`
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  height: 35px;
  width: 18rem;
`;
const InputForPassword = styled.input`
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  height: 35px;
  width: 18rem;
`;

const SubmitButton = styled.button`
  text-transform: uppercase;
  background: #626fe6;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  height: 35px;
  width: 18rem;
  margin-bottom: 30px;
  transition: all 300ms ease-in;
  cursor: pointer;
  &:hover {
    background: #c4c1e0;
    color: black;
    font-weight: bold;
  }
`;
const OtherOptionTile = styled.div`
  margin-bottom: 30px;
`;
const OtherOptionWrapper = styled.div`
  display: flex;
  width: 18rem;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

const ViaGoogle = styled.button`
  background-color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 33%;
  border-radius: 5px;
`;
const ViaTwitter = styled.button`
  background-color: #1da1f2;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 33%;
  border-radius: 5px;

  color: #fff;
`;
const StyledAiOutlineTwitter = styled(AiOutlineTwitter)`
  color: #fff;
`;

const ViaGithub = styled.button`
  background-color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 33%;
  border-radius: 5px;
`;

const GoogleTitle = styled.span`
  margin-left: 5px;
`;
const TwitterTitle = styled.span`
  margin-left: 5px;
`;
const GithubTitle = styled.span`
  margin-left: 5px;
`;
