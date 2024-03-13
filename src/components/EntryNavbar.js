import { NavLink, Outlet } from "react-router-dom";
export default function EntryNavbar() {
    return (
        <div className="flex_div reg_form_div_1">
            <NavLink className="entry_link" to="/">Sign In</NavLink>
            <NavLink className="entry_link" to="/registration">Registration</NavLink>
            {/* <Outlet /> */}
        </div>
    );
}
