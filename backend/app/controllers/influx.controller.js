const influx = require('../models/influx.model')

// exports.getCpu = (req, res) => {
//     influx.getData(req.query.hostList,req.query.applicationList, req.query.metricList, req.query.start, req.query.end
//         ,"cpu"
//         ).then(
//         (result) => {
//            res.status(200).send(result);
//         }   
//     )
// }   

// exports.getMem = (req, res) => {
//     influx.getData(req.query.hostList,req.query.applicationList, req.query.metricList, req.query.start, req.query.end
//         ,"mem").then(
//         (result) => {
//               res.status(200).send(result);
//           }
//     )
// }

// exports.getPostgresql = (req, res) => {
//     influx.getData(req.query.hostList,req.query.applicationList, req.query.metricList, req.query.start, req.query.end
//         ,"postgresql").then(
//         (result) => {
//               res.status(200).send(result);
//           }
//     )
// }

exports.getData = (req, res) => {
    influx.getData(req.query.hostList, req.query.metricList, req.query.start, req.query.end
        ,req.query.parameter).then(
        (result) => {
           res.status(200).send(result);
        }   
    ).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    )
}