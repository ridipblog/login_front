import axios from "axios";
const instance = axios.create({
    // baseURL: "https://login-backend-dph4.onrender.com",
    baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
        accept: "application/json",
    }
});
export default instance;
