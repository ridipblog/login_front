import { useState } from "react";
import "./entrynavbar.css";
import "./main_entry.css";
import axios from 'axios';
import Entry from "./Entry";
import EntryNavbar from "./EntryNavbar";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import baseInstance from "./base/baseServer";
export default function Registration() {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const text = ["Welcome Page", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente vitae nemo aut rerum, maiores sit commodi eius excepturi quis nihil?"]
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password,
            checked

        };
        baseInstance.post('/registration', data).then((response) => {
            if (response.data.status === 400) {
                setError(response.data.message);
                toast.error(response.data.message, {
                    duration: 2000,
                    position: 'top-center'
                });
            } else {
                navigate('/');
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
                        <h1>ACCOUNT SIGN UP</h1>
                        <label>User Name</label>
                        <input type="text" name="username" placeholder="User Name" value={username} onChange={(e) => setUserName(e.target.value)} />
                        <label>Email ID</label>
                        <input type="email" name="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" name="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="flex_div form_div_1">
                            <input type="checkbox" value={checked} onChange={() => setChecked(!checked)} />
                            <p><span>I agree all the statements in </span><br /><span> Terms of service</span></p>
                        </div>
                        <button type="submit">Sign Up</button>
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
