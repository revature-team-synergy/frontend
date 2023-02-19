import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import profilePic from "../../../../assets/profile-picture.jpg";
import "./Information.css";
import { User } from "../../../../models/User";

const Information: React.FC = () => {

    const userState = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<User>(userState.user);

    return (
        <div className="profileCardContainer">
            <div id="informationHeaderContainer">
                <img src={profilePic} alt="Profile Picture" className="profilePic"/>
                <h2>Personal Information</h2>
            </div>
            <form className="profileInfo" onSubmit={(e) => {e.preventDefault()}}>
                <div id="nameContainer">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" 
                    value={user.firstName} 
                    onChange={(e) => setUser({
                        firstName: e.target.value,
                        id: user.id,
                        lastName: user.lastName,
                        password: user.password,
                        email: user.email,
                        userRole: user.userRole
                    })}/>

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" 
                    value={user.lastName}
                    onChange={(e) => setUser({
                        lastName: e.target.value,
                        id: user.id,
                        firstName: user.firstName,
                        password: user.password,
                        email: user.email,
                        userRole: user.userRole
                    })}/>
                </div>

                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={userState.user.email} readOnly/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                <button id="changePasswordSubmit" type="submit">Save</button>
            </form>
        </div>
    );
}

export default Information;
