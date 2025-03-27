import React from 'react';
import './Login.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom';

function Login() {
    return (
        <div className='login-full-page'>
            <div className="container-login">
                <div className="login">
                    <div action='' method='post' className='login-form'>
                        <h5>Login</h5>
                        <div className="user-input">
                            <label htmlFor="">Email</label>
                            <div className="input">
                                <AiOutlineMail />
                                <input name='email' type="email" placeholder='example@gmail.com' />
                            </div>
                        </div>
                        <div className="user-input">
                            <label htmlFor="">Password</label>
                            <div className="input">
                                <RiLockPasswordLine />
                                <input name='password' type="Password" placeholder='password' />
                            </div>
                        </div>
                        <div className="remember">
                            <input type="checkbox" name="" id="" />
                            <p>remember password</p>
                        </div>
                        <NavLink to='/dashboard'><button>Sign In</button></NavLink>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Login;
