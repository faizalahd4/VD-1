/**
 *
 * BASIC ROUTER FILE USING FOR NODEJS, MONGO & ANGULAR CODE TESTING APPLICATION.
 * @AUTHOR - FAIZAL
 * @DATE - 16/12/2018
**/

/* DECLARING EXPRESS VARIABLE */
var express = require("express");
/* DECLARING PATH VARIABLE */
var path = require("path");
/* CREATE ROUTER OBJECT */
var router = express.Router();
/* DECLARING BODY PARSER VARIABLE */
var bodyParser = require("body-parser");
/* DECLARING MONGODB VARIABLE */
var MongoClient = require('mongodb').MongoClient;
/* IMPORTING CONSTANTS FILE */
var CONSTANT = require('./shared/service/constantService');
/* IMPORTING VALIDATION FILE */
var validationService = require('./shared/service/validationService');
/* IMPORTING UTIL FILE */
var utilService = require('./shared/service/utilService');
/* IMPORTING CUSTOME ERROR CLASS */
const CustomeError = require('./shared/service/customeError'); 
/* MONGO DB URL */
var url = CONSTANT.getMongodbURL();
/* EXPORTING THE ROUTER MODULE */
module.exports = router;

/* APPENDING BODYPARSER */
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded())
/* ADD DATA REQUEST - STARTS */
router.post("/addData", function(req, res) {
    /* TRY FEATURE */
    try {
        /* CHECKING OBJECT */
        var data = utilService.splitKeyValue(req.body);
        /* CHECK WHETHER ITS VALIDA OR NOT */
        if (!data.isValid) {
            /* THROWING ERROR */
            throw new CustomeError(data.msg);
        }
        /* ASSIGNING SPLITTED KEY VALUE PAIR TO NEW SET */
        req.body = data.output;
        /* VALIDATING */
        var validationOutput = validationService.validateAddData(req.body["key"], req.body["value"]);
        /* CHECK WHETHER ITS VALIDA OR NOT */
        if (!validationOutput.isValid) {
            /* THROWING ERROR */
            throw new CustomeError(validationOutput.msg);
        }
        /* ASSIGNING REQUEST OBJECT INTO LOCAL OBJECT FOR ALTERATION AND MONGO DB USE */
        var master = req.body;
        /* APPENDING TIMESTAMP */
        master.timestamp = new Date().getTime();
        /* CREATING UNIQUE KEY */
        master["_id"] = master.key; 
        /* OUTPUT */
        var output = {};
        /* MONGO DB CONECTION  WITH MONGOBD CONNECTION DETAILS - STARTS */
        MongoClient.connect(url, function(err, db) {

            /* CHECKING WHETHER CONNECTED OR NOT - FAILRE CASE */
            if (err) {
                /* THROWING ERROR */
                throw new Error(err);
            /* FAILURE CASE */
            }
            
            /* GENERATION UPDATE QUERY FOR WHERE CASE */
            var myquery = {_id: master.key};
            /* CREATING COLLECTION AND INSERT QUERY - STARTS */
            db.collection("user").updateOne(myquery, master, { upsert: true }, function(err, res) {
            //if (err) return res.status(500).send({error: err });
                /* CHECKING WHETHER CONNECTED OR NOT - FAILRE CASE */
                if (err) {
                    /* THROWING ERROR */
                    throw new Error(err);
                } else if (res.result.nModified == 0) { 
                    /* CHECKING WHETHER DATA ADDED OR NOT */
                    master = {code: -1, output: "Data not added / updated successfully. Please try again later."};  
                }
                /* CLOSING THE CONNECTION */
                db.close();
            });
            /* CREATING COLLECTION AND INSERT QUERY - ENDS */
        });
        /* DELETING ID PROPERTY */
        delete master["_id"];
        /* MONGO DB CONECTION  WITH MONGOBD CONNECTION DETAILS - ENDS */
        /* SENDING THE FINAL RESPONSE */
        return res.send(master);
    } catch (error) {
        /* LOGGING ERROR IN THE LOG FILE */
        console.error(error);
        /* GENERATING FAILURE OUTPUT */
        output = {code: -1, output: (error.message) ? error.message : "Something went wrong. Please try again later."};
        /* SENDING THE FINAL RESPONSE */                  
        return res.send(output);
    }    
});
/* ADD DATA REQUEST - ENDS */

/* GET DATA REQUEST - STARTS */
router.get("/getData/:key?/:timestamp?", function(req, res) {
    /* OUTPUT */
    var output = {};
    /* TRY FEATURE */
    try {
        /* MERGING TWO OBJECT */
        var master = Object.assign({}, req.params, req.query);
        /* VALIDATING */
        var validationOutput = validationService.validateGetData(master.key, master.value);
        /* CHECK WHETHER ITS VALIDA OR NOT */
        if (!validationOutput.isValid) {
            /* THROWING ERROR */
            throw new CustomeError(validationOutput.msg);
        }
        /* GENERATION SEARCH QUERY FOR WHERE CASE */
        var searchQuery = {"key": master.key};
        /* CHECKING WHETHER TIMESTAMP PROPERTY EXISTS OR NOT */
        if (req.query.timestamp) {
            /* CREATING TIME STAMP QUERY */
            searchQuery = {"$and": [{"key": master.key}, {"timestamp": {"$lte": parseInt(master.timestamp)}}]};
        }

        /* MONGO DB CONECTION  WITH MONGOBD CONNECTION DETAILS - STARTS */
        MongoClient.connect(url, function(err, db) {
            /* CHECKING WHETHER CONNECTED OR NOT - FAILRE CASE */
            if (err) {
                /* THROWING ERROR */
                throw new Error(err);
            }

            /* CREATING COLLECTION AND FIND QUERY - STARTS */
            db.collection("user").findOne(searchQuery, {_id: false, key: false, timestamp: false}, function(err, result) {
                /* CHECKING WHETHER CONNECTED OR NOT - FAILRE CASE */
                if (err) {
                    /* THROWING ERROR */
                    throw new Error(err);
                }
                /* CLOSING THE CONNECTION */
                db.close();
                /* CHECKING WHETHER DATA EXISTS OR NOT */
                if (result == null) {
                    result = {code: -1, output: "Data doesn't exists."};
                }
                /* SENDING THE FINAL RESPONSE */                  
                return res.send(result);
            });
            /* CREATING COLLECTION AND FIND QUERY - ENDS */
        });
        /* MONGO DB CONECTION  WITH MONGOBD CONNECTION DETAILS - ENDS */
        
    } catch (error) {
        /* LOGGING ERROR IN THE LOG FILE */
        console.error(error);
        /* GENERATING FAILURE OUTPUT */
        output = {code: -1, output: (error.message) ? error.message : "Something went wrong. Please try again later."};
        /* SENDING THE FINAL RESPONSE */                  
        return res.send(output);
    }
});
/* GET DATA REQUEST - ENDS */