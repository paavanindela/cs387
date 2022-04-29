const controller = require("../controllers/threshold.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/threshold", [authJwt.verifyToken], controller.allThreshold);
    app.put("/api/threshold", [authJwt.verifyToken], controller.updateThreshold);
    app.post("/api/threshold", [authJwt.verifyToken], controller.addThreshold);
    app.delete("/api/threshold/:hostname/:metricname", [authJwt.verifyToken], controller.deleteThreshold);
    app.get("/api/message", [authJwt.verifyToken], controller.allMessage);
};