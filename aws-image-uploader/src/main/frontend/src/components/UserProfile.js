import React from 'react'
import { Dropzone } from './Dropzone'
import * as Constant from './../constants/constants'

export function UserProfile({ userProfile }) {

  return (
    <li>
      <div>
        {userProfile.userProfileId ? (<img src={Constant.DOWNLOAD_USERPROFILE_IMAGE(userProfile.userProfileId)} />) : null}
      </div>
      {userProfile.userName}
      <Dropzone userProfileId={userProfile.userProfileId} />
    </li>
  )
}