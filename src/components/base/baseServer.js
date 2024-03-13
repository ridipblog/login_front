import axios from "axios";
const instance = axios.create({
    baseURL: "https://fees-fa-figured-reid.trycloudflare.com",
    headers: {
        'Content-Type': 'application/json'
    }
});
export default instance;
