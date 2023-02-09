import React from 'react'
import { useSelector } from "react-redux";
import { AuthState } from "../models/AuthState";
import { RootState } from "../redux/store";

const UserView = () => {

    const state: AuthState = useSelector((state: RootState) => state.user);


    return (
        <div>
            <div>{state.user.firstName}</div>
            <div>{state.user.email}</div>
            <div>{state.user.password}</div>
        </div>
    )
}

export default UserView