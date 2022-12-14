
import {getToken } from "../helpers/Usuario";
import axios from "axios";
const url= "127.0.0.1:8000/"

const clienteAxios = axios.create({baseURL: url});
const token = getToken();
clienteAxios.interceptors.request.use(
    function (config) {
        config.headers["authorization"] = `Bearer ${token.value}`;
        return config;
    },
);

export default clienteAxios;