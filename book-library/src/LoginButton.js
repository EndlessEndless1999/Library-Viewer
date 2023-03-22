import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//CREATES BUTTON AND CHECKS IF AUTHENTICATED. THEN EXECUTES LOGIN FUNCTION FROM AUTH0;
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();


    return(
        !isAuthenticated && (
            <button onClick={loginWithRedirect}>
                Log In!
            </button>
        )
    )
}

export default LoginButton;