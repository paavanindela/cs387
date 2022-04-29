import axios from "axios";
const API_URL = "http://localhost:5000/api/"
import { authHeader } from "../_helpers/auth-header";

const getThresholds = (username) => {
    return axios.get(API_URL + "/threshold", {
        headers: authHeader()
    });
}

const modifyThreshold = (hostname, metricname, threshold) => {
    return axios.put(API_URL + "/threshold", {
        hostname,
        metricname,
        threshold
    }, {
        headers: authHeader()
    });
}

const addThreshold = ( hostname, metricname, threshold) => {
    return axios.post(API_URL + "threshold", {
        hostname,
        metricname,
        threshold
    }, {
        headers: authHeader()
    });
}

const deleteThreshold = ( hostname, metricname) => {
    return axios.delete(API_URL + "threshold", {
        hostname,
        metricname
    }, {
        headers: authHeader()
    });
}

const getAllMessages = () => {
    return axios.get(API_URL + "message", {
        headers: authHeader()
    });
}

const thresholdService = {
    getThresholds,
    modifyThreshold,
    addThreshold,
    deleteThreshold,
    getAllMessages
}

export default thresholdService;