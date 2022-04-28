const controller = require("../controllers/host.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/host", controller.allHost);
    app.get("/api/host/:hname", controller.oneHost);
    app.post("/api/host", controller.addHost);
    app.put("/api/host/:hname", controller.modifyHost);
    app.delete("/api/host/:hname", controller.deleteHost);
};