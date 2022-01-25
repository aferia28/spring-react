import React, {useState, useEffect} from 'react'
import axios from "axios";
import { UserProfile } from './UserProfile';

export function UserList() {

    const [userProfiles, setUserProfiles] = useState([]);

    const fetchUserProfiles = () => {
      axios.get("http://localhost:8080/api/v1/user-profile/").then(res => {
        console.log(res);
        setUserProfiles(res.data);
      });
    }
  
    useEffect(()=>{
      fetchUserProfiles();
    }, []);

    return (
        <div>
            <ul>
                {userProfiles.map((userProfile, index) => (
                    <UserProfile key={userProfile.userProfileId} userProfile={userProfile}/>
                ))}
            </ul>
        </div>
    )
}
