import React, { useState } from 'react';
import './Login.css';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, API_KEY } from '../../api/apiConfig';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/v1/auth/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            console.log("Login response data:", data);


            localStorage.setItem("access_token", data.data.accessToken);
            localStorage.setItem("refresh_token", data.data.refreshToken);
            if (data.data.user) {
                localStorage.setItem("user", JSON.stringify(data.data.user));
            }




            navigate('/dashboard');
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className='login-full-page'>
            <div className="container-login">
                <div className="login">
                    <form onSubmit={handleLogin} className='login-form'>
                        <h1>Teefey Admin</h1>
                        <h5>Login</h5>
                        <div className="user-input">
                            <label>Email</label>
                            <div className="input">
                                <AiOutlineMail />
                                <input
                                    name='email'
                                    type="email"
                                    placeholder='example@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="user-input">
                            <label>Password</label>
                            <div className="input">
                                <RiLockPasswordLine />
                                <input
                                    name='password'
                                    type="password"
                                    placeholder='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="remember">
                            <input type="checkbox" />
                            <p>remember password</p>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
