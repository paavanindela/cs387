const Chcacm = require("../models/chcacm.model");

exports.allChcacm = (req, res) => {
    output = {
        'hlist': null,
        'alist': null,
        'mlist': null
    };

    Chcacm.getch(req.userId).then(row1 => {
        output['hlist'] = row1;
        Chcacm.getca(req.userId).then(row2 => {
            output['alist'] = row2;
            Chcacm.getcm(req.userId).then(row3 => {
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
    console.log(req.body);
    Chcacm.addch(req.body.hlist, req.userId).then(() => {
        Chcacm.addca(req.body.alist, req.userId).then(() => {
            Chcacm.addcm(req.body.mlist, req.userId).then(() => {
                res.status(201).send({message: "changes made successfully"});
            });
        });
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};