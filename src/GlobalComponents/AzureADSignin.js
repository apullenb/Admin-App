import React,{useState} from "react";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../services/azureAD/authConfig";
import Button from "react-bootstrap/Button";

import { graphConfig } from "../services/azureAD/authConfig";


export const AADSignInButton = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [picture, setPicture] = useState('');

      function handleLogin(instance) {
    instance.loginPopup(loginRequest)
        .then(res=> console.log(res))
        .then((res) =>{
              RequestAccessToken()
        })
        .catch(e => {
            console.error(e);
        });
    }

      function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        }

        instance.acquireTokenSilent(request).then((response) => {
                setAccessToken(response.accessToken);
                console.log(response.accessToken);
                callMsGraph(response.accessToken)
            }).catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
                    setAccessToken(response.accessToken);
                });
            });

        }

        function callMsGraph(accessToken) {
            const headers = new Headers();
            const bearer = `Bearer ${accessToken}`;
        
            headers.append("Authorization", bearer);

           const header = {
                headers:{
                    Authorization: bearer
                }
            }
        
            const options = {
                headers: headers
            };

        
              axios.get(graphConfig.graphMeEndpoint, header)
                .then(response => console.log(response))
                .catch(error => console.log(error));

              axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', header)
              .then(res=>{
                  console.log(res.data)
                  var imageLink = window.URL.createObjectURL(new Blob([res.data]), {type:'image/png'});
                  console.log(imageLink) 
                  setPicture(imageLink)
                })
              .catch(error=> console.log(error));
              
        }

    return (
        <>
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in Azure AD</Button>
        <img src={`${picture}`} style={{width:'150px', height:'150px'}}/>
        </>
    );
}