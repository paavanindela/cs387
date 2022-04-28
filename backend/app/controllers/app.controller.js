const App = require("../models/app.model");

exports.oneApp = (req, res) => {
    App.findOneApp(req.params.appid).then(app => {
        if(!app.rows[0]){
            res.status(404).send({message: "app not found"});
        }
        res.status(200).send(app.rows[0]);
    });
};

exports.modifyApp = (req, res) => {
    App.modifyApp(req.params.appid, req.body.appid, req.body.name, req.body.status, req.body.owner, req.body.hostname).then(() => {
        res.status(200).send({message: "app updated successfully"});
    });
};

exports.deleteApp = (req, res) => {
    App.deleteApp(req.params.appid).then(() => {
        res.status(200).send({message: "host deleted successfully"});
    });
};

exports.addApp = (req, res) => {
    App.addApp(req.body.appid, req.body.name, req.body.status, req.body.owner, req.body.hostname).then(() => {
        res.status(201).send({message: "app created successfully"});
    });
};

exports.allApp = (req, res) => {
    App.findAllApp(req.body.hnamelist).then(hostlist => {
        res.status(200).send(hostlist.rows);
    });
};