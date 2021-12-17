import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import styled from 'styled-components';

import { useHistory } from 'react-router';

import * as AZACTIONTYPES from '../redux/actions/azure/azureActions';

export const AADSignInButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedIn } = useSelector((state) => state.app);
  const { instance } = useMsal();

  const login = () => {
    dispatch(AZACTIONTYPES.handleLogin(instance));
  };
  const logout = () => {
    dispatch(AZACTIONTYPES.handleLogout(instance));
    history.push('/');
  };

  return <>{!loggedIn ? <LinkButton onClick={() => login()}>Sign In</LinkButton> : <LinkButton onClick={() => logout()}>Sign Out</LinkButton>}</>;
};

const LinkButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #0f4b8f;
  font-weight: 700;
`;
