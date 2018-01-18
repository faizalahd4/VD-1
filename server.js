/**
 *
 * BASIC NODERJS FILE USING FOR NODEJS, MONGO & ANGULAR CODE TESTING APPLICATION.
 * @AUTHOR - FAIZAL
 * @DATE - 16/12/2018
**/

/* DECLARING EXPRESS VARIABLE */
var express = require("express");
/* DECLARING PATH VARIABLE */
var path = require("path");
/* DECLARING EXPRESS OBJECT */
var app = express();
/* EXPORTING ROUTER FILE */
var router = require("./src/app/router");
//HAVE ACCESS TO ALL REQUEST N RESPONSE IN THE APPLICATION
app.use("/", router);

/* DECLARING STATIC FILE TO LOAD  */
app.use(express.static(__dirname + "/src/assets"));

/* OPEN INDEX.HTML FILES - STARTS */
app.get("/", function(req, res) {
    return res.sendFile(path.join(__dirname, "index.html"))
});
/* OPEN INDEX.HTML FILES - ENDS */

/* LISTENING TO THE PORT - STARTS */
app.listen(8080, function () {
   console.log("Listening..."); 
});
/* LISTENING TO THE PORT - ENDS */