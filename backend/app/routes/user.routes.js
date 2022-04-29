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
  app.put(
    "/api/active/:username",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.makeActive
  );
  app.put(
    "/api/revoke",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.revokeAccess
  )
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
    controller.getHosts
  );
  app.get(
    "/api/getapps",
    [authJwt.verifyToken],
    controller.getApps
  )
  app.get(
    "/api/getmetrics",
    [authJwt.verifyToken],
    controller.getMetrics
  )
  app.delete(
    "/api/controller/delete/:username",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteController
  );
};