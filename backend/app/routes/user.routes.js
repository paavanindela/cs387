const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );
  app.put(
    "/api/active",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.makeActive
  );
  app.get(
    "/api/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAll
  );
  app.post(
    "/api/addcontroller",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addController
  );
  app.get(
    "/api/gethosts",
    [authJwt.verifyToken],
    controller.addController
  );
};