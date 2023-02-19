export interface User {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginUser {
    email: string;
    password: string;
}