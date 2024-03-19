import axios from "axios";
const instance = axios.create({
    baseURL: "https://login-backend-dph4.onrender.com/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'Content-Type': 'application/json'
    }
});
export default instance;
