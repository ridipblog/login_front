import { useContext, useEffect, useState } from "react";
import { menuContext } from "../Profile";
import { cookieContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const SettingMenu = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useContext(menuContext);
    const [cookies, setCookies, removeCookie] = useCookies(['user']);
    const closeMenu = () => {
        setMenu(!menu);
    }
    const logoutUser = async () => {
        console.log("Ok");
        removeCookie('token');
        removeCookie('token', { path: '/' });
        navigate('/login');
    }
    return (
        <>
            <div className="flexDiv main_profile_menu">
                <div className="flexDiv main_profile_menu_div">
                    <div className="flexDiv profile_menu_head_div">
                        <p className="profile_menu_head_p">
                            <span><i className="fa-solid fa-bell"></i></span>
                        </p>
                        <div className="flexDiv profile_menu_head_div_1">
                            <span><i className="fa-solid fa-user"></i></span>
                            <p>Ridip Goswami</p>
                            <p>I Am Just A Programmer... </p>
                        </div>
                    </div>
                    <div className="flexDiv profile_menu_body_div">
                        <p>
                            <span><i className="fa-regular fa-user"></i></span>
                            <span>Profile</span>
                        </p>
                        <p>
                            <span><i className="fa-solid fa-gear"></i></span>
                            <span>Setting</span>
                        </p>
                        <p onClick={logoutUser}>
                            <span><i className="fa-solid fa-right-from-bracket"></i></span>
                            <span>Logout</span>
                        </p>
                        <div className="flexDiv profile_menu_notify_div">
                            <p>Enable Notifications</p>
                            <p><span>If you want to notify everyday from us.</span> <input type="checkbox" /> </p>
                        </div>
                        <div className="flexDiv profile_menu_close_div">
                            <button onClick={closeMenu}><span><i className="fa-solid fa-xmark"></i></span> <span>Close</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SettingMenu;
