import axios from "axios";
import { authHeader } from "../_helpers/auth-header";

const url = "http://localhost:5000/api/influx/data";

const getData = (hostList,metricList,start,end,parameter) => {
    return axios.get(url,{
        headers: authHeader(),
        params: {
            hostList: hostList,
            metricList: metricList,
            start: start,
            end: end,
            parameter: parameter
        }
    }).then(
        (response) => {
            let json = response.data;
            console.log(json)
            let finalData = {};
            for( let i=0 ; i< metricList.length; i++){
                finalData[metricList[i]] = [];
            }
            for (let i = 0; i < json.length; i++) {
                let point = finalData[json[i]["_field"]].find((el) => el["time"] == json[i]["_time"])
                if (point != undefined) {
                    point[json[i]["host"]] = json[i]["_value"]
                    finalData[json[i]["_field"]].map(el => el["time"] == json[i]["_time"] ? point : el);
                }
                else {
                    point = {}
                    point[json[i]["host"]] = json[i]["_value"]
                    point["time"] = json[i]["_time"]
                    finalData[json[i]["_field"]].push(point)
                }

            }
            return finalData;
        }
    ).catch(
        (error) => {
            console.log(error);
        }
    );
}

const influxService = {
    getData
};

export default influxService;