import { useContext } from "react";
import { InfoContext } from "../Profile";
const ProfileCenter = () => {
    const info = useContext(InfoContext);
    return (
        <div className="flexDiv main_profile_center">
            <div className="flexDiv profile_center">
                <h1>Hello {info.infoState.name === "No Name" ? "Ridip" : info.infoState.name}</h1>
                <p>Social chat website fosters connections, enabling users to chat, share, and engage, fostering a vibrant online community experience.</p>
                <button>Connect People</button>
            </div>
        </div>
    )
}
export default ProfileCenter;
