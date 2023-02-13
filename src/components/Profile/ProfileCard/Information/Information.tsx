import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import profilePic from "../../../../assets/profile-picture.jpg";


const Information: React.FC = () => {

    const userState = useSelector((state: RootState) => state.user);

    return (
        <div className="profileCardContainer">
            <h3>Information</h3>
            <img src={profilePic} alt="Profile Picture" />
            <div>{userState.user.firstName}</div>
            <div>{userState.user.lastName}</div>
            <div>{userState.user.email}</div>

        </div>
    );
}

export default Information;