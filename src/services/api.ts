import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.107.10.16:3333",
    timeout: 700,
})