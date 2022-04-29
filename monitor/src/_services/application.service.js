import axios from "axios";
const API_URL = "http://localhost:5000/api/app"
import { authHeader } from "../_helpers/auth-header";

const getAnApp = (appid) => {
    return axios.get(API_URL + "/" + appid,{
        headers : authHeader()
        });
    }

const modifyAnApp = (appid, name, status, owner, hostname) => {
    return axios.put(API_URL + "/" + appid, {
        name,
        status,
        owner,
        hostname
    },{
        headers : authHeader()
        });
}

const deleteAnAp = (appid) => {
    return axios.delete(API_URL + "/" + appid);
}

const addAnApp = (appid, name, status, owner, hostname) => {
    return axios.post(API_URL, {
        appid,
        name,
        status,
        owner,
        hostname
    },{
        headers : authHeader()
        });
}

const getAllApps = (hnamelist) => {
    console.log(hnamelist);
    return axios.get(API_URL ,
        {hnamelist},
        {headers : authHeader()
        });
}

const applicationService = {
    getAnApp,
    modifyAnApp,
    deleteAnAp,
    addAnApp,
    getAllApps
}

export default applicationService;