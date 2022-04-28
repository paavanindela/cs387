const Host = require("../models/host.model")

exports.oneHost = (req, res) => {
    Host.findOneHost(req.params.hname).then(host => {
        if(!host.rows[0]){
            res.status(404).send({message: "host not found"});
        }
        res.status(200).send(host.rows[0]);
    });
    //res.status(200).send("onehostok");
};

exports.allHost = (req, res) => {
    Host.findAllHost().then(host => {
        res.status(200).send(host.rows);
    });
    // res.status(200).send("allhostok");
};

exports.addHost = (req, res) => {
    Host.addHost(req.body.hostname, req.body.ipaddress, req.body.macaddress, req.body.ostype, req.body.influx).then(() => {
        res.status(201).send({
            message: "host created successfully"
        });
    });
    //res.status(200).send("addhostok");
};

exports.modifyHost = (req, res) => {
    Host.modifyHost(req.params.hname, req.body.hostname, req.body.ipaddress, req.body.macaddress, req.body.ostype, req.body.influx).then(() => {
        res.status(200).send({message: "host updated successfully"});
    });
    // res.status(200).send("modifyhostok");
};

exports.deleteHost = (req, res) => {
    Host.deleteHost(req.params.hname).then(() => {
        res.status(200).send({message: "host deleted successfully"});
    });
    // res.status(200).send("deletehostok");
};
