const dboperations = require("./dboperations");
var Db = require("./dboperations");
var Tipo = require("./tipo");

var express = require("express");
var express = require("body-parser");
var cors = require("cors");
const { response } = require("express");
var app = express();
var router = express.Router();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api", router);

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Tipo API is runnning at " + port);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/movimientos").get((request, response) => {
  dboperations.getTipo().then((result) => {
    //console.log(result);
    response.json(result[0]);
  });
});
