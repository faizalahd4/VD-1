/**
 *
 * VALIDATION FILE USING FOR NODEJS, MONGO & ANGULAR CODE TESTING APPLICATION.
 * @AUTHOR - FAIZAL
 * @DATE - 16/12/2018
**/

module.exports = {
    /* ADD DATA VALIATION */
    validateAddData: function (key, value) {
        /* DECLARING LOCAL VARIABLE */
        var output = {msg: "", isValid: true};
        /* BASIC VALIDATION FOR KEY FIELD */
        if (typeof key === 'undefined' || typeof key === null || typeof key === 'object' || Array.isArray(key) || key.trim() == "") {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key is required. Please provide the Key";
            output.isValid = false;
        /* BASIC VALIDATION FOR VALUE FIELD */
        } else if (typeof value === 'undefined' || typeof value === null || typeof value === 'object' || Array.isArray(value) || value.trim() == "") {
            /* ADDING ERROR MESSAGE */
            output.msg = "Value is required. Please provide the Value";
            output.isValid = false;
            /* WHITE SPACE NOT ALLOWED IN KEY FIELD */
        } else if (key.indexOf(" ") > -1) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key should not have white space.";
            output.isValid = false;
            /* SPECIAL CHARACTER NOT ALLOWED IN KEY FIELD */
        } else if (!/^[a-zA-Z0-9-_]*$/.test(key)) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key should have only alphabet, number and following special chacater alone -_";
            output.isValid = false;
            /* SPECIAL CHARACTER NOT ALLOWED IN VALUE FIELD */
        } else if (!/^[a-zA-Z0-9-_@&.()+? ]*$/.test(value)) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Value should have only alphabet, number and following special chacater alone -_@&.()+?";
            output.isValid = false;
        }
        
        return output;
    },
    /* GET DATA VALIATION */
    validateGetData: function (key, timestamp) {
        /* DECLARING LOCAL VARIABLE */
        var output = {msg: "", isValid: true};
        /* BASIC VALIDATION FOR KEY FIELD */
        if (typeof key === 'undefined' || typeof key === null || typeof key === 'object' || Array.isArray(key) || key.trim() == "") {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key is required. Please provide the Key";
            output.isValid = false;
            /* WHITE SPACE NOT ALLOWED IN KEY FIELD */
        } else if (key.indexOf(" ") > -1) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key should not have white space.";
            output.isValid = false;
            /* SPECIAL CHARACTER NOT ALLOWED IN KEY FIELD */
        } else if (!/^[a-zA-Z0-9-_]*$/.test(key)) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key should have only alphabet, number and following special chacater alone -_";
            output.isValid = false;
            /* WHITE SPACE NOT ALLOWED IN TIMESTAMP FIELD */
        } else if ((typeof timestamp === 'string' || typeof timestamp === 'number') && timestamp.indexOf(" ") > -1) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Timestamp should not have white space.";
            output.isValid = false;
            /* SPECIAL CHARACTER NOT ALLOWED IN TIMESTAMP FIELD */
        } else if ((typeof timestamp === 'string' || typeof timestamp === 'number') && !/^[0-9]*$/.test(timestamp)) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Invalid timestamp, only number allowed. Please provide a valid timestamp.";
            output.isValid = false;
        }
        return output;
    },
    isJson: function (str) {
        /* DECLARING LOCAL VARIABLE */
        var isValid = true;
        try {
            /* CHECKING WHETHER ITS OBJECT */
            if (typeof str == 'object') {
                isValid = true;
            } else {
                JSON.parse(str);    
            }
        } catch (e) {
            isValid = false;
        }
        return isValid;
    }
};