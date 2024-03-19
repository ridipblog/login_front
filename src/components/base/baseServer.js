import axios from "axios";
const instance = axios.create({
    baseURL: "https://login-backend-dph4.onrender.com/",
    headers: {
        'Content-Type': 'application/json'
    }
});
export default instance;
