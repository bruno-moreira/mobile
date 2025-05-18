import axios from "axios";

export const api = axios.create({
    baseURL: "http://172.12.170.70:3333",
    timeout: 700,
})