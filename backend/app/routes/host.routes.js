const controller = require("../controllers/host.controller");
const { authJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/host", [authJwt.verifyToken], controller.allHost);
    app.get("/api/host/:hname", [authJwt.verifyToken], controller.oneHost);
    app.post("/api/host", [authJwt.verifyToken, authJwt.isAdmin], controller.addHost);
    app.put("/api/host/:hname", [authJwt.verifyToken, authJwt.isAdmin], controller.modifyHost);
    app.delete("/api/host/:hname", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteHost);
};