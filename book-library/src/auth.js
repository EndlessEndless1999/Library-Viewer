import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';


// References to environment variables in .env files
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client = process.env.REACT_APP_AUTH0_CLIENT_ID;

const Auth0 = () => {
    return (
        <Auth0Provider
        domain={domain}
        client={client}
        redirectUri={window.location.origin}
        ></Auth0Provider>
    )
}

export default Auth0;