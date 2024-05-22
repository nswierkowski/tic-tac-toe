import React, { useState, useContext } from "react";
import UserPool from "../UserPool"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import {AccountContext} from './Account';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password)
        .them((data) => console.log("logged in!", data))
        .catch((err) => {
            console.error("Failed to login ", err)
        });
    }

    return (
        <div>
            <label>Log in to play a game!</label>
            <form onSubmit={onSubmit}>
                <label htmlFor="login">Login</label>
                <input 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)}>
                </input>
                <label htmlFor="password">Password</label>
                <input 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)}>
                </input>

                <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login;