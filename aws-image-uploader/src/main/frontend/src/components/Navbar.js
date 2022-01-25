import React from 'react'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import * as Constants from "./../constants/constants"
import { Login } from './Login'
import { Logout } from './Logout'
import { Profile } from './Profile'
import { UserList } from './UserList'

export function Navbar() {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated);
    console.log(window.location.origin);
    console.log(window.location);

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container main-container">
                <a className="navbar-brand" href="#">Brand</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <Auth0Provider
                            domain={Constants.AUTH0_DOMAIN}
                            clientId={Constants.AUTH0_CLIENTID}
                            redirectUri={window.location.origin}>
                            {isAuthenticated ? <>
                                <li className="nav-item">
                                    <Login />
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Profile />
                                </li>
                                <li className="nav-item">
                                    <Logout />
                                </li>
                            </>
                            }
                        </Auth0Provider>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
