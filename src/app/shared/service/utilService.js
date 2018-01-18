/**
 *
 * UTIL FILE USING FOR NODEJS, MONGO & ANGULAR CODE TESTING APPLICATION.
 * @AUTHOR - FAIZAL
 * @DATE - 16/12/2018
**/

module.exports = {
    /* SPLITTING KEY AND VALUE */
    splitKeyValue: function (dataObj) {
        /* DECLARING LOCAL VARIABLE */
        var output = {msg: "", isValid: true,  output: {}};
        /* VALIDATION CHECK */
        if (typeof dataObj === 'undefined' || typeof dataObj === null || typeof dataObj != 'object' || Array.isArray(dataObj) || Object.getOwnPropertyNames(dataObj).length == 0) {
            /* ADDING ERROR MESSAGE */
            output.msg = "Please provide a valid data.";
            output.isValid = false;
        } else {
            /* TAKING KEYS ALONE */
            var keys = Object.keys(dataObj);
            /* ADDING FIRST KEYS ALONE */
            output.output = {key: keys[0], value: dataObj[keys[0]]};
        }
        return output;
    }
};