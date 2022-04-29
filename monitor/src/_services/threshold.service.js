import axios from "axios";
const API_URL = "http://localhost:5000/api/"
import { authHeader } from "../_helpers/auth-header";

const getThresholds = (username) => {
    return axios.get(API_URL + "threshold", {
        headers: authHeader()
    }).then(
        (response) => {
            return response.data;
        }
    );
}

const modifyThreshold = (hostname, metricname, threshold) => {
    return axios.put(API_URL + "threshold", {
        hostname,
        metricname,
        threshold
    }, {
        headers: authHeader()
    }).then(
        (response) => {
            return response.data;
        }
    );
}

const addThreshold = ( hostname, metricname, threshold) => {
    return axios.post(API_URL + "threshold", {
        hostname,
        metricname,
        threshold
    }, {
        headers: authHeader()
    }).then(
        (response) => {
            return response.data;
        }
    );
}

const deleteThreshold = ( hostname, metricname) => {
    console.log(hostname, metricname);
    return axios.delete(API_URL + "threshold/"+hostname+"/"+metricname, {
        headers: authHeader()
    }).then(
        (response) => {
            return response.data;
        }
    );
}

const getAllMessages = () => {
    return axios.get(API_URL + "message", {
        headers: authHeader()
    }).then(
        (response) => {
            return response.data;
        }
    );
}

const thresholdService = {
    getThresholds,
    modifyThreshold,
    addThreshold,
    deleteThreshold,
    getAllMessages
}

export default thresholdService;