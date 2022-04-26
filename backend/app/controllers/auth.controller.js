const User = require("../models/user.model");
const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;
// const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  // Save User to Database
  User.create(
    req.body.username,
    bcrypt.hashSync(req.body.password, 8)
  )
  .then(()=>{
    res.status(201).send({
      message: "User created successfully!"
    });
  })
    // .then(user => {
    //   if (req.body.roles) {
    //     Role.findAll({
    //       where: {
    //         name: {
    //           [Op.or]: req.body.roles
    //         }
    //       }
    //     }).then(roles => {
    //       user.setRoles(roles).then(() => {
    //         res.send({ message: "User was registered successfully!" });
    //       });
    //     });
    //   } else {
    //     // user role = 1
    //     user.setRoles([1]).then(() => {
    //       res.send({ message: "User was registered successfully!" });
    //     });
    //   }
    // })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
   User.findOne(
      req.body.username
    )
    .then(user => {
      if (!user.rows[0]) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.rows[0].password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      // var authorities = [];
      // user.getRoles().then(roles => {
        // for (let i = 0; i < roles.length; i++) {
        //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
        // }
        res.status(200).send({
          id: user.rows[0].id,
          username: user.rows[0].username,
          role: user.rows[0].status,
          accessToken: token
        });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};