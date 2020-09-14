const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/route") 
var bodyParser=require('body-parser');

mongoose.connect("mongodb://localhost:27017/andeladb", { useNewUrlParser: true })
.then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use("/api", routes);

    app.listen(5000, () => {
        console.log("Server has started!")
    })
})