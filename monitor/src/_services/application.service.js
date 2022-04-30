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

const deleteAnApp = (appid) => {
    return axios.delete(API_URL + "/" + appid, {
        headers: authHeader()
    });
}

const addAnApp = ( name, status, owner, hostname) => {
    return axios.post(API_URL, {
        
        name,
        status,
        owner,
        hostname
    },{
        headers : authHeader()
        });
}

const getAllApps = () => {
    // console.log(hnamelist);
    return axios.get(API_URL +'/all',
        {headers : authHeader()
        });
}

const getHostApp = (hnameList) => {
    return axios.get(API_URL + '/host/all', {
        headers: authHeader(),
        params: {
            hnamelist: hnameList
        }
    });
}

const applicationService = {
    getAnApp,
    modifyAnApp,
    deleteAnApp,
    addAnApp,
    getAllApps,
    getHostApp
}

export default applicationService;