import axios from "axios";

const url = "http://localhost:5000/api/influx/";

const getCpu = (hostList) => {
    return axios.get(url + "cpu",{
        params: {
            hostList: hostList
        }
    }).then(
        (response) => {
            let json = response.data;
            let finalData = [];
            for (let i = 0; i < json.length; i++) {
                let point = finalData.find((el) => el["time"] == json[i]["_time"])
                if (point != undefined) {
                    point[json[i]["host"]] = json[i]["_value"]
                    finalData.map(el => el["time"] == json[i]["_time"] ? point : el);
                }
                else {
                    point = {}
                    point[json[i]["host"]] = json[i]["_value"]
                    point["time"] = json[i]["_time"]
                    finalData.push(point)
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
    getCpu
};

export default influxService;