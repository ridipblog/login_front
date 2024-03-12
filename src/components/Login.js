import { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import baseInstance from './base/baseServer';
import "./entrynavbar.css";
import "./main_entry.css";
import axios from 'axios';
import Entry from "./Entry";
import EntryNavbar from "./EntryNavbar";
// cookie context from app
import { cookieContext } from "../App";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const text = ["Welcome Back", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente vitae nemo aut rerum, maiores sit commodi eius excepturi quis nihil?"]
    const [cookies, setCookies] = useCookies(['user']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.token) {
            navigate('/profile');
        }
    }, [cookies.token]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,
            password,

        };
        baseInstance.post('/login', data).then(async (response) => {
            if (response.data.status === 400) {
                toast.error(response.data.message, {
                    duration: 2000,
                    position: 'top-center'
                });
                // setError(response.data.message);
            } else {
                setCookies('token', response.data.message, { path: '/' });
                navigate('/profile');
            }
        }).catch((error) => {
            console.log(error);
        })

    }
    return (
        <>
            <Toaster />
            <div className="flex_div main_entry_div main_reg_div">
                <Entry propText={text} />
                <form onSubmit={handleSubmit} className="flex_div reg_div reg_form_div">
                    <EntryNavbar />
                    <div className="flex_div form_div">
                        <h1>ACCOUNT SIGN IN</h1>
                        <label>Email ID</label>
                        <input type="email" name="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" name="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="flex_div form_div_1">
                            <input type="checkbox" />
                            <p>Reminder Me</p>
                        </div>
                        <button type="submit">Sign In</button>
                        <p className="error">{error}</p>
                    </div>
                </form>

            </div>
            {/* <h1>Registration</h1> */}

            {/* <form onSubmit={handleSubmit} method="post">
                <select value={role} name="gender" onChange={(e) => setRole(e.target.value)}>
                    <option >Select</option>
                    <option value="1">Admin</option>
                    <option value="2">Users</option>
                </select>
                <button type="submit">Registration</button>
            </form> */}

        </>
    )
}
