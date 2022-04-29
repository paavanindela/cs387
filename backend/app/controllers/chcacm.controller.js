const Chcacm = require("../models/chcacm.model");
const User = require("../models/user.model");

exports.allChcacm = (req, res) => {
    output = {
        'hlist': null,
        'alist': null,
        'mlist': null
    };

    Chcacm.getch(req.params.username).then(row1 => {
        output['hlist'] = row1;
        Chcacm.getca(req.params.username).then(row2 => {
            output['alist'] = row2;
            Chcacm.getcm(req.params.username).then(row3 => {
                output["mlist"] = row3;
                res.status(200).send(output);
            });
        });
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.addChcacm = (req, res) => {
    Chcacm.addch(req.body.hlist, req.params.username).then(() => {
        Chcacm.addca(req.body.alist, req.params.username).then(() => {
            Chcacm.addcm(req.body.mlist, req.params.username).then(() => {
                res.status(201).send({message: "changes made successfully"});
            });
        });
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};