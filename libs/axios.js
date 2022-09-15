import axios from "axios"

export const http = axios.create({
    baseURL: process.env.BACKEND_API ?? "http://localhost/api/v1/",
})