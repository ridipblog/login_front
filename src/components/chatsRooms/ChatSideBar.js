import { NavLink } from "react-router-dom";
export default function ChatSideBar() {
    return (
        <div className="flexDiv main-chat-side-div">
            <div className="flexDiv chat-side-menu">
                <p><i className="fa-brands fa-rocketchat"></i></p>
            </div>
            <div className="flexDiv chat-side-menu">
                <NavLink className="chat-side-nav">
                    <i className="fa-solid fa-user-group"></i>
                </NavLink>
                <NavLink className="chat-side-nav"><i className="fa-solid fa-plus"></i></NavLink>
                <NavLink className="chat-side-nav"><i className="fa-solid fa-gear"></i></NavLink>
                <NavLink className="chat-side-nav" to="/profile"><i className="fa-solid fa-power-off"></i></NavLink>
            </div>
        </div>
    )
}
