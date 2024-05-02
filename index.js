let bodyParser = require('body-parser');
let express = require("express");
let app = express();
let router = require("./routes/routes");
let connection = require("./database/connection");
let createAdmin = require("./scripts/CreteAdmin");

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async () => {
  await createAdmin.requestCreateAdmin();
})();

app.use("/",router);

app.listen(4444,() => {
    console.log("Servidor rodando");
});