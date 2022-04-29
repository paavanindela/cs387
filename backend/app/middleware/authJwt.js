const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// const db = require("../models");
// const User = db.user;
const User = require("../models/user.model");
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(req.headers["x-access-token"]);
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  
  User.findOne(req.userId).then(user => {
    
    if (user.rows[0] && user.rows[0].status == 2) {
        next();
        return;
    }
      
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    
  });
};
isActive = (req, res, next) => {
  User.findOne(req.username).then(user => {

    if (user.rows[0] && user.rows[0].status == 1) {
        next();
        return;
    }
      
      res.status(403).send({
        message: "Require Active Role!"
      });
      return;
    
  });
};

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }
//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };
// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }
//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
// };
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
//   isModerator: isModerator,
//   isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;