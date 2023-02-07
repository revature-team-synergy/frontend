import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from "../models/User";
import { AppDispatch } from "../redux/store";
import { registerUser, setUser } from '../redux/userSlice';

const RegisterForm: React.FC = () => {
    const [formValues, setFormValues] = useState<User>({
        id: "0",
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userRole: ''
    });

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("This is from handleSubmit", formValues);
        try {
            dispatch(setUser(formValues));
            await dispatch(registerUser(formValues));
        } catch(error) {
            console.error(error);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={formValues.firstName} onChange={e => setFormValues({ ...formValues, firstName: e.target.value })} />
        <input type="email" value={formValues.email} onChange={e => setFormValues({ ...formValues, email: e.target.value })} />
        <input type="password" value={formValues.password} onChange={e => setFormValues({ ...formValues, password: e.target.value })} />
        <button type="submit">Submit</button>
        </form>
    );
};

export default RegisterForm;
