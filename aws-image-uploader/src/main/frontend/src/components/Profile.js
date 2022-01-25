import React from 'react'
import { useLocation } from 'react-router-dom'
import * as Constant from './../constants/constants'
import { Button } from './Button'

export function Profile() {

    const location = useLocation();
    const { userProfile } = location.state

    console.log(userProfile);
    return (
        <>
            <div className='row'>
                <div className="col">
                    <div>
                        {userProfile.userProfileId ? (<img src={Constant.DOWNLOAD_USERPROFILE_IMAGE(userProfile.userProfileId)} />) : null}
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-6"></div>
                        <div className="col-3"></div>
                        <div className="col-3">
                            <Button type='light' text="Editar perfil" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4"></div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-12"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12"></div>
            </div>
        </>
    )
}
