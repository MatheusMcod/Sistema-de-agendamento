let bodyParser = require('body-parser');
let express = require("express");
let app = express();
let router = require("./routes/routes");
let connection = require("./database/connection");
 
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",router);

app.listen(4444,() => {
    console.log("Servidor rodando");
});