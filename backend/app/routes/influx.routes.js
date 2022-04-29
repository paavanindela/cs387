const controller = require("../controllers/influx.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // app.get("/api/influx/cpu",
    //     [authJwt.verifyToken],
    //     controller.getCpu);
    // app.get("/api/influx/memory",
    //     [authJwt.verifyToken],
    //     controller.getMem);
    // app.get("/api/influx/postgresql",
    //     [authJwt.verifyToken],
    //     controller.getPostgresql);
    app.get("/api/influx/data",
        [authJwt.verifyToken],
        controller.getData);
};