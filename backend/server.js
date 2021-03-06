const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: ["http://localhost:8081","http://localhost:8080"]
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./app/models");
// db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to project application." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/influx.routes')(app);
require('./app/routes/host.routes')(app);
require('./app/routes/app.routes')(app);
require('./app/routes/metric.routes')(app);
require('./app/routes/chcacm.routes')(app);
require('./app/routes/threshold.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


