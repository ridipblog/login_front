import { useContext, useEffect } from "react";
import { InfoContext } from "../Profile";
import { menuContext } from "../Profile";
const ProfileHead = () => {
    const info = useContext(InfoContext);
    const [menu, setMenu] = useContext(menuContext);
    const displayMenu = () => {
        setMenu(!menu);
        console.log(menu)
    }
    useEffect(() => {
    }, []);
    return (
        <>
            <div className="flexDiv profile_head_div">
                <div className="flexDiv profile_setting_menu">
                    <div className="flexDiv profile_setting_menu_div">
                        <span className="rotate_setting" onClick={displayMenu}><i className="fa-solid fa-gear"></i></span>
                        {/* <h1>USER PROFILE</h1> */}
                    </div>
                </div>
                <div className="flexDiv profile_head_div_1">
                    <div className="flexDiv profile_head_sub_div">
                        <div className="flexDiv profile_head_input_div">
                            <span><i className="fas fa-search"></i></span>
                            <input type="text" name="search_people" placeholder="Search People" />
                        </div>
                        <div className="flexDiv profile_head_user_div">
                            <span><i className="fa-solid fa-user"></i></span>
                            <span>{info.infoState.name === "No Name" ? "Ridip Goswami" : info.infoState.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileHead;
