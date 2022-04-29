// import { InfluxDB, Point } from '@influxdata/influxdb-client'
const InfluxDB = require('@influxdata/influxdb-client')
// /** Environment variables **/

const config = require('../config/influx.config')
/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 *
 * Get a query client configured for your org.
 **/

const queryApi = new InfluxDB.InfluxDB({url:config.URL, token:config.TOKEN}).getQueryApi(config.ORG)

// function to convert hostList to flux query
function convertList(List,value) {
    let influxQuery = "|> filter(fn: (r) => ";
    for (let i = 0; i < List.length; i++) {
        influxQuery += 'r["'+value+'"] == \"' + List[i] + '\"';
        if (i != List.length - 1)
            influxQuery += ' or ';
    } 
    influxQuery += ')';
    return influxQuery;
}


async function getData(hostList,metricList,start,end,parameter) {
    // insert the converted hostlist into fluxquery
    let hostX = convertList(hostList,"host");
    // let appX = convertList(applicationList,"_measurement");
    let metricX = convertList(metricList,"_field");
    const fluxQuery = 'from(bucket: "PROJECT")\
        |> range(start: '+start+', stop: '+end+')\
        |> filter(fn: (r) => r["_measurement"] == "'+parameter+'")\ '
        + metricX + '\ '
        + hostX + '\
        |> aggregateWindow(every: 10m, fn: mean, createEmpty: false)\
        |> yield(name: "mean")'
    let res = [];
    await queryApi.collectRows(fluxQuery)
    .then(
      data => {
        res = data
        console.log('COLLECT ROWS SUCCESS')
      })
    .catch(error => {
        console.error(error)
        console.log('COLLECT ROWS ERROR')
     });
    return res;
}

// async function getMem(hostList){
//     let influxQuery = convertList(hostList);
//     const fluxQuery = 'from(bucket: "PROJECT")\
//         |> range(start: -30d, stop: -20d)\
//         |> filter(fn: (r) => r["_measurement"] == "mem")\
//         |> filter(fn: (r) => r["_field"] == "used_percent")\ '
//         + influxQuery + '\
//         |> aggregateWindow(every: 10m, fn: mean, createEmpty: false)\
//         |> yield(name: "mean")'
//     let res = [];
//     const result = await queryApi.collectRows(fluxQuery)
//     .then(
//         data => {
//             res = data
//             console.log('COLLECT ROWS SUCCESS')
//         }
//     )
//     .catch(error => {
//         console.error(error)
//         console.log('COLLECT ROWS ERROR')
//     }
//     );    
// }

module.exports = {getData}