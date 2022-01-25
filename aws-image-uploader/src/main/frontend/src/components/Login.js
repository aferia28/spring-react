import React from 'react'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export function Login() {

    const { loginWithRedirect } = useAuth0();

    return (
        <a className="nav-link" onClick={() => loginWithRedirect()}>
            Sign In
        </a>
    )
}
