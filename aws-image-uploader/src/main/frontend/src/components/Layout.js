import { React, useState, useEffect } from 'react'
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import * as Constants from "./../constants/constants"
import { Login } from './Login'
import { Logout } from './Logout'

export function Layout() {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated);

    const [userProfile, setUserProfile] = useState([]);

    const fetchUserProfile = () => {
        axios.get(Constants.GET_PROFILE("d152da65-a3b6-468f-915d-faed7409a0fd")).then(res => {
            console.log(res);
            setUserProfile(res.data);
        });
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
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
                                        <Link className="nav-link" to="profile" state={{ userProfile: userProfile }}>Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="timeline">Timeline</Link>
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
            <div className="container main-container">
                <Outlet />
            </div>
        </div>

    )
}
