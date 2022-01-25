import React from 'react'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export function Logout() {

    const { logout } = useAuth0();

    return (
        <a className="nav-link" href="#" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
        </a>
    )
}
