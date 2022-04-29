import axios from "axios";
import {authHeader} from "../_helpers/auth-header";
const API_URL = "http://localhost:5000/api/host/";

const getAllHost = () => {
    return axios.get(API_URL, {headers: authHeader()}).then(
        (response) => {
            return response.data;
        }
    );
};

const getOneHost = (hostname) => {
    return axios.get(API_URL + hostname, {headers: authHeader()}).then(
        (response) => { 
            return response.data;
        }
    );
};

const addHost = (hostname, ipaddress, macaddress, ostype, influx) => {
    console.log(hostname, ipaddress, macaddress, ostype, influx);
    return axios.post(API_URL, {hostname, ipaddress, macaddress, ostype, influx}, {headers: authHeader()}).then(
        (response) => {
            return response.data;
        }
    );
};

const modifyHost = (hname, hostname, ipaddress, macaddress, ostype, influx) => {
    return axios.put(API_URL + hname, {hostname, ipaddress, macaddress, ostype, influx}, {headers: authHeader()}).then(
        (response) => {
            return response.data;
        }
    );
};

const deleteHost = (hostname) => {
    return axios.delete(API_URL + hostname, {headers: authHeader()}).then(
        (response) => {
            return response.data;
        }
    );
};

const HostService = {
  getAllHost,
  getOneHost,
  addHost,
  modifyHost,
  deleteHost
};
export default HostService;