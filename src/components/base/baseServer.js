import axios from "axios";
const instance = axios.create({
    // baseURL: "https://proven-porcelain-year-cycle.trycloudflare.com",
    baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
        accept: "application/json",
    }
});
export default instance;
