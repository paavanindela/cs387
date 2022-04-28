const controller = require("../controllers/app.controller");
const { authJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/app/:appid", controller.oneApp);
    app.put("/api/app/:appid", controller.modifyApp);
    app.delete("/api/app/:appid", controller.deleteApp);
    app.get("/api/app", controller.allApp);
    app.post("/api/app", controller.addApp);
};