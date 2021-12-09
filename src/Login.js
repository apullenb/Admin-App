import React, { useEffect, useState } from 'react';
import Logo from './assets/Zilis_Logo_2021.png';
import { Form, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSkincareAdmin } from './redux/actions/Skincare/skincareActions';
import Footer from './GlobalComponents/footer';
import { Redirect } from 'react-router';
import { useToasts } from 'react-toast-notifications';

function Login() {
  const { fetching, error } = useSelector(({ entries }) => entries);
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });
  const { addToast } = useToasts();

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });

  const handleLogin = async () => {
    if (userCredentials.username && userCredentials.password) {
      dispatch(LoginSkincareAdmin(userCredentials));
    } else {
      addToast('Enter Username and Password', {
        autoDismiss: true,
        appearance: 'error',
      });
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, {
        autoDismiss: true,
        appearance: 'error',
      });
    }
  }, [error]);

  if (localStorage.getItem('Token')) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Top>
        <div className='top-wrapper'>
          <div className='inner-wrapper'>
            <a href='/'>
              <img src={Logo} alt='Zilis Logo' style={{ maxWidth: '170px', margin: '1px auto' }} />
            </a>
            {/* <img src={ProfileImage} alt="Profile Image" className="profile-pic" /> */}
          </div>
        </div>
        <hr />
      </Top>

      <FormWrapper>
        <Title>ADMIN LOGIN</Title>
        <Form.Control name='username' placeholder='Enter Username' value={userCredentials.username} onChange={(e) => handleChange(e)} />
        <Form.Control
          name='password'
          type='password'
          placeholder='Enter Password'
          value={userCredentials.password}
          onChange={(e) => handleChange(e)}
        />
        {fetching ? (
          <Spinner animation='border' />
        ) : (
          <Button className='primary' onClick={() => handleLogin()}>
            Login
          </Button>
        )}
      </FormWrapper>
      <Footer />
    </>
  );
}

export default Login;

const FormWrapper = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: flex-center;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 2% 6%;
  width: 35%;
  height: 350px;
  border-radius: 5px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
`;

const Title = styled.span`
  text-align: center;
  font-size: 40px;
  color: rgb(92, 90, 90, 0.8);
  font-weight: 450;
  margin: 10px;
`;
const Top = styled.div`
  text-align: center;
  padding-top: 10px;

  .profile-pic {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 70px;
    border-radius: 50%;
  }

  hr {
    display: block;
    border: none;
    border-bottom: 3px solid #043769;
    margin-bottom: 0;
  }
`;
