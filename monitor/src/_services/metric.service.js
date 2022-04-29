import axios from "axios";
import { authHeader } from "../_helpers/auth-header";
const API_URL = "http://localhost:5000/api/metric";

const getAlerts = () => {
    return axios.get(API_URL, { headers: authHeader() }).then(
        (response) => {
            return response.data;
        }
    );
}

const addMetric = (name) => {
    return axios.post(API_URL, {name}, { headers: authHeader() }).then(
        (response) => {
            return response.data;
        }
    );
}

const deleteMetric = (name) => {
    return axios.delete(API_URL + "/" + name, { headers: authHeader() }).then(
        (response) => {
            return response.data;
        }
    );
}

const metricService = {
    getAlerts,
    addMetric,
    deleteMetric
}

export default metricService;