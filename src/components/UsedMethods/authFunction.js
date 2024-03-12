
import axios from "axios";
import baseInstance from "../base/baseServer";
const authFunction = async (token, navigate, removeCookie) => {
    var user_data;

    if (token) {
        var check_user = null;
        try {
            check_user = await baseInstance.get("/check_auth", {
                params: {
                    token: token
                }
            });
            if (!check_user.data.message) {
                removeCookie("token");
                navigate('/login');
            } else {
                user_data = check_user.data.message;
            }
        } catch (err) {
            check_user = null;
        }
    } else {
        navigate('/login');
    }
    return user_data;
}
export default authFunction;
