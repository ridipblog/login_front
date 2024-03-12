import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import ProfileHead from "./profle/ProfileHead";
import ProfileCenter from "./profle/ProfileCenter";
import SettingMenu from "./profle/SettingMenu";
import authFunction from "./UsedMethods/authFunction";
import "./class.css"
import "./profle/profile.css";
import "./profle/profile_head.css";
import "./profle/profile_center.css";
import "./profle/setting_menu.css";
import "./profle/profile_details.css";
import { createContext, useEffect, useState } from "react";
import ProfileDetails from "./profle/ProfileDetails";
export const InfoContext = createContext();
export const menuContext = createContext();
export default function Profile() {
    const [cookies, , removeCookie] = useCookies(['user']);
    // const [cookies, setCookies, removeCookie] = useContext(cookieContext);
    const navigate = useNavigate();
    const [infoState, setInfoState] = useState('');
    const infoContext = {
        infoState,
    }
    const [menu, setMenu] = useState(false);
    const getData = async () => {
        const info = await authFunction(cookies.token, navigate, removeCookie);
        setInfoState(info);
    }
    useEffect(() => {
        if (cookies.token) {
            getData();
        } else {
            navigate('/login');
        }
    }, []);
    return (
        <>

            <InfoContext.Provider value={infoContext}>
                <menuContext.Provider value={[menu, setMenu]}>
                    <div className="flexDiv main_profile">
                        {
                            menu ? <SettingMenu /> : <p>dkjshj</p>
                        }
                        <ProfileHead />
                        <ProfileCenter />
                    </div >

                    <ProfileDetails />
                </menuContext.Provider>
            </InfoContext.Provider >
        </>
    )
}
