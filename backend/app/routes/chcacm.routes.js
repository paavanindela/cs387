const controller = require("../controllers/chcacm.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/chcacm/:username", [authJwt.verifyToken], controller.allChcacm);
    app.post("/api/chcacm/:username", [authJwt.verifyToken, authJwt.isAdmin], controller.addChcacm);
};
