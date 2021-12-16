import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../services/azureAD/authConfig';
import * as AZACTIONS from '../redux/actions/azure/azureAdActionTypes';
import { LOGGED_IN, LOG_OUT } from '../redux/actions/app/appActionTypes';
import { graphConfig } from '../services/azureAD/authConfig';
import styled from 'styled-components';

export const AADSignInButton = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.app);
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  function handleLogin(instance) {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        //console.log(res);
        dispatch({ type: AZACTIONS.SETAZADACCESSTOKEN, payload: res.accessToken });
      })
      .then((res) => {
        RequestAccessToken();
      })
      .catch((e) => {
        // console.error(e);
      });
  }

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
        //console.log(response.accessToken);
        callMsGraph(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          setAccessToken(response.accessToken);
        });
      });
  }

  function callMsGraph(accessToken) {
    const bearer = `Bearer ${accessToken}`;
    const options = {
      headers: {
        Authorization: bearer,
      },
    };

    axios
      .get(graphConfig.graphMeEndpoint, options)
      .then((response) => {
        //console.log(response);
        dispatch({ type: AZACTIONS.GETAZPROFILESUCCESS, payload: response.data });
        dispatch({ type: LOGGED_IN, payload: true });
      })
      .catch((error) => {
        //console.log(error);
        dispatch({ type: AZACTIONS.GETAZPROFILEFAILURE, payload: error });
      });

    axios
      .get('https://graph.microsoft.com/v1.0/me/photo/$value', { ...options, responseType: 'blob' })
      .then((res) => {
        const url = window.URL || window.webkitURL;
        var imageLink = url.createObjectURL(new Blob([res.data]), { type: 'image/jpeg' });
        dispatch({ type: AZACTIONS.GETAZPROFILEIMAGESUCCESS, payload: imageLink });
      })
      .catch((error) => {
        //console.log(error);
        dispatch({ type: AZACTIONS.GETAZPROFILEIMAGEFAILURE, payload: error });
      });
  }

  function handleLogout(instance) {
    instance
      .logoutPopup()
      .then(() => {
        dispatch({ type: LOG_OUT });
        dispatch({ type: AZACTIONS.RESETSTATE });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <>
      {!loggedIn ? (
        <LinkButton onClick={() => handleLogin(instance)}>Sign In</LinkButton>
      ) : (
        <LinkButton onClick={() => handleLogout(instance)}>Sign Out</LinkButton>
      )}
    </>
  );
};

const LinkButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #0f4b8f;
  font-weight: 700;
`;
