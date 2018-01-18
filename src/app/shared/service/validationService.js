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
        }
        return output;
    },
    /* GET DATA VALIATION */
    validateGetData: function (key, timestamp) {
        /* DECLARING LOCAL VARIABLE */
        var output = {msg: "", isValid: true};
        /* BASIC VALIDATION FOR KEY FIELD */
        if (typeof key === 'undefined' || typeof key === null || key.trim() == "") {
            /* ADDING ERROR MESSAGE */
            output.msg = "Key is required. Please provide the Key";
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