const Chcacm = require("../models/chcacm.model");
const User = require("../models/user.model");

exports.allChcacm = (req, res) => {
    output = {
        'hlist': []
    };

    User.findOne(req.userId).then(user => {
        if(!user.rows[0]){
            res.status(500).send({message: "user not found"});
        }
        else if(user.rows[0].status===0){
            res.status(500).send({message: "user not active"});
        }
        else{
            Chcacm.getch(req.params.username).then(row1 => {
                output['hlist'] = row1.rows;
                res.status(200).send(output);
            });
        }
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};

exports.addChcacm = (req, res) => {
    Chcacm.addch(req.body.hlist, req.params.username).then(() => {
        res.status(201).send({message: "changes made successfully"});
    }).catch(
        err => {
            res.status(500).send({message: err.message});
        }
    );
};