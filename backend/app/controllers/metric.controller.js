const Metric = require("../models/metric.model");

exports.allMetric = (req, res) => {
    Metric.findAllMetric().then(metric => {
        res.status(200).send(metric.rows);
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.addMetric = (req, res) => {
    Metric.addMetric(req.body.name).then(() => {
        res.status(201).send({message: "metric created successfully"});
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.deleteMetric = (req, res) => {
    Metric.deleteMetric(req.params.name).then(() => {
        res.status(200).send({message: "metric deleted successfully"});
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};
