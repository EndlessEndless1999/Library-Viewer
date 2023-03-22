import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//CREATES BUTTON AND CHECKS IF AUTHENTICATED. THEN EXECUTES LOGOUT FUNCTION FROM AUTH0;
const LogoutButton = () => {
    const { isAuthenticated, logout } = useAuth0();

    return(
        (
            <button onClick={() => {
                logout({ 
                  logoutParams: {
                    returnTo: window.location.origin
                  }
                });
              }}>
                Sign Out.
            </button>
        )
    )
}

export default LogoutButton;