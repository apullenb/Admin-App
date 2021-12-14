import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../services/azureAD/authConfig';
import Button from 'react-bootstrap/Button';
import * as AZACTIONS from '../redux/actions/azure/azureAdActionTypes';

import { graphConfig } from '../services/azureAD/authConfig';

export const AADSignInButton = () => {
  const dispatch = useDispatch();
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [picture, setPicture] = useState('');

  function handleLogin(instance) {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        console.log(res);
        dispatch({ type: AZACTIONS.SETAZADACCESSTOKEN, payload: res.accessToken });
      })
      .then((res) => {
        RequestAccessToken();
      })
      .catch((e) => {
        console.error(e);
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
        console.log(response.accessToken);
        callMsGraph(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          setAccessToken(response.accessToken);
        });
      });
  }

  function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append('Authorization', bearer);

    const header = {
      headers: {
        Authorization: bearer,
      },
    };

    const options = {
      headers: headers,
    };

    axios
      .get(graphConfig.graphMeEndpoint, header)
      .then((response) => {
        console.log(response);
        dispatch({ type: AZACTIONS.GETAZPROFILESUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: AZACTIONS.GETAZPROFILEFAILURE, payload: error });
      });

    axios
      .get('https://graph.microsoft.com/v1.0/me/photos/48x48/$value', header)
      .then((res) => {
        console.log(res.data);
        const url = window.URL || window.webkitURL;
        var imageLink = url.createObjectURL(new Blob([res.data]), { type: 'image/jpeg' });
        console.log(imageLink);
        setPicture(imageLink);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Button variant='secondary' className='ml-auto' onClick={() => handleLogin(instance)}>
        Sign in Azure AD
      </Button>
      <img src={picture} style={{ width: '150px', height: '150px' }} />
    </>
  );
};
