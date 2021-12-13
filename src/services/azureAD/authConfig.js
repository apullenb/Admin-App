export const msalConfig = {
    auth: {
      clientId: "28be827a-4b33-4101-bc00-8e74691fd4da",
      authority: "https://login.microsoftonline.com/a00f60f9-cf7f-47c9-9e94-9d796802ec9d", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: " http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };