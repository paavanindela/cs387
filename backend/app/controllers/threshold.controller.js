const Threshold = require("../models/threshold.models");

exports.allThreshold = (req, res) => {
    Threshold.allThreshold(req.userId).then(thres => {
        res.status(200).send(thres.rows);
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.updateThreshold = (req, res) => {
    Threshold.modifyThreshold(req.userId, req.body.hostname, req.body.metricname, req.body.threshold).then(() => {
        res.status(200).send({message: "threshold update successful"});
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.addThreshold = (req, res) => {
    Threshold.addThreshold(req.userId, req.body.hostname, req.body.metricname, req.body.threshold).then(() => {
        res.status(201).send({message: "threshold insert successful"});
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.deleteThreshold = (req, res) => {
    Threshold.deleteThreshold(req.userId, req.params.hostname, req.params.metricname).then(() => {
        res.status(200).send({message: "threshold delete successful"});
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.allMessage = (req, res) => {
    Threshold.allMessage(req.userId).then(msg => {
        res.status(200).send(msg.rows);
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};
