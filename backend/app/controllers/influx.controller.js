const influx = require('../models/influx.model')

exports.getCpu = (req, res) => {
    influx.getCpu(req.query.hostList).then(
        (result) => {
           res.status(200).send(result);
        }   
    )
}   
