const User = require("../models/user.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.makeActive = (req, res) => {
    User.findOne(
       req.body.username
     )
     .then(user => {
       if (!user.rows[0]) {
         return res.status(404).send({ message: "User Not found." });
       }
       User.makeActive(req.query.user)
       .then(()=>{
        res.status(201).send({
          message: "User made Active successfully!"
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
       // var authorities = [];
       // user.getRoles().then(roles => {
         // for (let i = 0; i < roles.length; i++) {
         //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
         // }
         res.status(201).send({
           message: 'Added Controller as active'
         });
       // });
     })
     .catch(err => {
       res.status(500).send({ message: err.message });
     });
 };

 exports.getAll = (req, res) => {
   User.findAll().then(user=>{res.status(200).send({user})})
   .catch(err => {
    res.status(500).send({ message: err.message });
  });
 }