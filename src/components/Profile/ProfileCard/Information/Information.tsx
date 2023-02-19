import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/Store";
import profilePic from "../../../../assets/profile-picture.jpg";
import "./Information.css";
import {User} from "../../../../models/User";
import {changeProfile} from "../../../../redux/slices/userSlice";
import axios from "axios";
import {remoteUrl} from "../../../../models/URL";
import {useNavigate} from 'react-router-dom';


const Information: React.FC = () => {

    const userState = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<User>(userState.user);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

    }, [invalidPassword])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const passwordValidation = {
            email: user.email,
            password: user.password
        }

        await axios.post(`${remoteUrl}/users/login`, passwordValidation).then(() => {
            const updateUser = {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            }
            const config = {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                }
            }
            axios.put(`${remoteUrl}/users`, updateUser, config)
                .then(() => {
                    navigate('/home')
                })
            dispatch(changeProfile(user));
        }).catch(() => {
            setInvalidPassword(true)
        })

    }

    return (
        <div className="profileCardContainer">
            <div id="informationHeaderContainer">
                <img src={profilePic} alt="Profile Picture" className="profilePic"/>
                <h2>Personal Information</h2>
            </div>
            <form className="profileInfo" onSubmit={(e) => {
                e.preventDefault()
            }}>
                <div id="nameContainer">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName"
                           value={user.firstName}
                           onChange={(e) => setUser({
                               firstName: e.target.value,
                               userID: user.userID,
                               lastName: user.lastName,
                               password: user.password,
                               email: user.email,
                               role: user.role
                           })}/>

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName"
                           value={user.lastName}
                           onChange={(e) => setUser({
                               lastName: e.target.value,
                               userID: user.userID,
                               firstName: user.firstName,
                               password: user.password,
                               email: user.email,
                               role: user.role
                           })}/>
                </div>

                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={userState.user.email} readOnly/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setUser({
                    lastName: user.lastName,
                    userID: user.userID,
                    firstName: user.firstName,
                    password: e.target.value,
                    email: user.email,
                    role: user.role
                })}/>
                {invalidPassword ? <p id="passwordWrong">Invalid Password </p> : ""}
                <button id="changePasswordSubmit" type="submit" onClick={handleSubmit}>Save</button>
            </form>
        </div>
    );
}

export default Information;
