const controller = require("../controllers/metric.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/metric", [authJwt.verifyToken], controller.allMetric);
    app.post("/api/metric", [authJwt.verifyToken, authJwt.isAdmin], controller.addMetric);
    app.delete("/api/metric/:name", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteMetric);
};