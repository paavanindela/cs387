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
function convertHostList(hostList) {
    let influxQuery = "|> filter(fn: (r) => ";
    for (let i = 0; i < hostList.length; i++) {
        influxQuery += 'r["host"] == \"' + hostList[i] + '\"';
        if (i != hostList.length - 1)
            influxQuery += ' or ';
    } 
    influxQuery += ')';
    return influxQuery;
}


async function getCpu(hostList) {
    // insert the converted hostlist into fluxquery
    let influxQuery = convertHostList(hostList);
    const fluxQuery = 'from(bucket: "PROJECT")\
        |> range(start: -30d, stop: -20d)\
        |> filter(fn: (r) => r["_measurement"] == "cpu")\
        |> filter(fn: (r) => r["_field"] == "usage_system")\
        |> filter(fn: (r) => r["cpu"] == "cpu-total")\ '
        + influxQuery + '\
        |> aggregateWindow(every: 10m, fn: mean, createEmpty: false)\
        |> yield(name: "mean")'
    let res = [];
    const result = await queryApi.collectRows(fluxQuery)
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

module.exports = {getCpu}