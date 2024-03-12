// import axios from "axios"
// export const checkAuth = async (token) => {
//     var check_user = null;
//     try {
//         check_user = await axios.get("http://localhost:4000/check_auth", {
//             params: {
//                 token: token
//             }
//         });
//     } catch (err) {
//         check_user = null;
//     }
//     if (!check_user.data.message) {
//         check_user = null;
//     }
//     return check_user;
// }
// import axios from "axios";
// import { useCookies } from "react-cookie"
// import { useNavigate } from "react-router-dom";
// const CheckAuth = async () => {
//     const [cookies, setCookies, removeCookie] = useCookies(['user']);
//     const [infoState, setInfoState] = useState('');
//     const navigate = useNavigate();
//     useEffect(() => {
//         const checkAuth = async () => {

//         }
//         checkAuth();
//     }, []);
//     return { infoState, setInfoState };
// }
// export default CheckAuth;
