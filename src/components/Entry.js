import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export default function Entry(props) {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['user']);
    const GoogleResponse = async (response) => {
        const decoded = await jwtDecode(response.credential);
        console.log(decoded.given_name);
        const data = await axios.get("https://fees-fa-figured-reid.trycloudflare.com/loginWithGoogle", {
            params: {
                login_email: decoded.email,
                given_name: decoded.given_name
            }
        });
        if (data.data.status === 200) {
            setCookies('token', data.data.message, { path: "/" });
            navigate('/profile');
        } else {
            console.log(data.data.message);
        }

    }
    return (
        <div className="flex_div reg_div reg_image_div">
            <h1>{props.propText[0]}</h1>
            <p>{props.propText[1]}</p>
            <div className="flex_div reg_image_div_1">
                <hr></hr>
                <p>Join With Our Product</p>
                <hr></hr>
            </div>
            <div className="flex_div reg_image_div_1">

                <GoogleOAuthProvider clientId="784573559341-io0bs0f5hi75hr4c3plh5cddnmi38946.apps.googleusercontent.com">
                    <GoogleLogin clientId="784573559341-io0bs0f5hi75hr4c3plh5cddnmi38946.apps.googleusercontent.com"
                        type="icon"
                        size="medium"
                        onSuccess={GoogleResponse}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>

                {/* <a href="http://localhost:4000/auth/google" ><i className="fa-brands fa-twitter"></i></a>
                <button className="socialLink" onClick={sendAuth} value="http://localhost:4000/auth/google"><i className="fa-brands fa-twitter"></i></button> */}
                {/* <NavLink className="social_link" to="/login"><i className="fa-brands fa-twitter"></i></NavLink> */}
                {/* <NavLink className="social_link" to="/auth/google"><i className="fa-brands fa-twitter"></i></NavLink> */}
                {/* <a href="/"><i className="fa-brands fa-facebook-f"></i></a> */}
            </div>
        </div>
    )
}
