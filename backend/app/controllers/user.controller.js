const User = require("../models/user.model");
const Host = require("../models/host.model")

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
      User.makeActive(req.body.username)
        .then(() => {
          res.status(201).send({
            message: "User made Active successfully!"
          });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.revokeAccess = (req, res) => {
  User.findOne(
    req.body.username
  )
    .then(user => {
      if (!user.rows[0]) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.revokeAccess(req.body.username)
        .then(() => {
          res.status(201).send({
            message: "Access Revoked successfully!"
          });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAll = (req, res) => {
  User.findAll().then(user => { res.status(200).send({ user }) })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.addController = (req, res) => {
  User.findOne(
    req.body.username
  )
    .then(user => {
      if (!user.rows[0]) {
        return res.status(404).send({ message: "User Not found." });
      }
      Host.findOneHost(
        req.body.hostname
      ).then(
        host => {
          if (!host.rows[0]) {
            return res.status(404).send({ message: "Host Not found." });
          }
          User.addController(req.body.username, req.body.hostname).then(
            () => {
              res.status(201).send({ message: "Controller Host Added Succesfully" })
            }
          ).catch(err => {
            res.status(500).send({ message: err.message });
          });
        }
      )
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.getHosts = (req, res) => {
  User.getHosts(req.userId).then(user => { res.status(200).send({ user }) })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.getApps = (req, res) => {
  User.getApps(req.userId).then(user => { res.status(200).send({ user }) })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.deleteController = (req, res) => {
  console.log(req.body)
  User.deleteController(req.params.username).then(user => { res.status(200).send({ user }) })
    .catch(err => {
      res.status(500).send({ message: err.message });
    }
  );
}

