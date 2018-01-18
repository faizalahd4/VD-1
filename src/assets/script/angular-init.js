/**
* ANGULAR-INIT JS FILE - USE TO IMPLEMENT ANGULAR CONTROLLER FEATURE AND HTTP FEATURE
* @AUTHOR - FAIZAL
* @DATE - 16/01/2018
**/

/* BOOSTRAPING THE ANGULAR MODULE */
var app = angular.module('myApp', []);

/* DECLARING MANAGEKEYVALUE CONTROLLER - STARTS */
app.controller('manageKeyValueCtrl', function($scope, $http) {
    
    /* DECLARING SCOPE VARIABLE */
    $scope.master = {};
    
    /**
    * USE TO ADD ITEM TO THE MONGODB
    * @INPUT - USER OBJECT AND FORM OBJECT
    * @OUTPUT - NA
    **/
    $scope.addItem = function (user, form) {
        /* GENERATING NEW OBJECT */
        var obj = {[user.key]: user.value};
        /* CALLING ADDDATA ACTION WITH DATA TO INSERT DATA INTO MONGODB */
        $http.post('/addData', obj).then(
            /* SUCCESS CASE */
            function successCallback(response) {
                if (!response.data.code) {
                    /* CALLING ALERT-POP FUNCTION TO SHOW SUCCESS MESSAGE */
                    $(".success-alert").alertpopup({msg: "Data has been successfully added - " + JSON.stringify(response.data), type: "SUCCESS"});
                } else {
                    /* CALLING ALERT-POP FUNCTION TO SHOW SUCCESS MESSAGE */
                    $(".error-alert").alertpopup({msg: response.data.output, type: "ERROR"});
                }
                /* CALLING CLEAR DATA METHOD TO RESET THE FORM FIELD VALUES */
                $scope.clearData(form);
            /* FAILURE CASE */
            }, function errorCallback(response) {
                /* ERROR MSG */
                var error = (response.data.output) ? response.data.output : "Something went wrong. Please try again later.";
                /* CALLING ALERT-POP FUNCTION TO SHOW ERROR MESSAGE */
                $(".error-alert").alertpopup({msg: error, type: "ERROR"});
          });
    };
    
    /**
    * USE TO GET ITEM FROM THE MONGODB
    * @INPUT - USER OBJECT AND FORM OBJECT
    * @OUTPUT - NA
    **/
    $scope.getItem = function (user, form) {
        /* CALLING GETDATA ACTION WITH DATA TO FETCH DATA FROM MONGODB */
        $http.get('/getData', { params: user}).then(
            /* SUCCESS CASE */
            function successCallback(response) {
                if (!response.data.code) {
                    /* CALLING ALERT-POP FUNCTION TO SHOW SUCCESS MESSAGE */
                    $(".success-alert").alertpopup({msg: "Data has been fetched successfully - " + JSON.stringify(response.data), type: "SUCCESS"});
                } else {
                    /* CALLING ALERT-POP FUNCTION TO SHOW SUCCESS MESSAGE */
                    $(".error-alert").alertpopup({msg: response.data.output, type: "ERROR"});
                }
                /* CALLING CLEAR DATA METHOD TO RESET THE FORM FIELD VALUES */
                $scope.clearData(form);
            /* FAILURE CASE */
            }, function errorCallback(response) {
                /* ERROR MSG */
                var error = (response.data.output) ? response.data.output : "Something went wrong. Please try again later.";
                /* CALLING ALERT-POP FUNCTION TO SHOW ERROR MESSAGE */
                $(".error-alert").alertpopup({msg: error, type: "ERROR"});
          });
    };
    
    /**
    * USE TO RESET THE FORM FIELDS AND VALIDATION
    * @INPUT - FORM OBJECT
    * @OUTPUT - NA
    **/
    $scope.clearData = function (form) {
        /* CHECKING WHETHER FORM EXISTS OR NOT */
        if (form) {
            /* RESETTING FORM VALIDATION PRISTINE */
            form.$setPristine();
            /* RESETTING FORM VALIDATION UNTOUCHED */
            form.$setUntouched();
        }
        /* RESETTING FORM OBJECT FROM THE SCOPE */
        $scope.user = angular.copy($scope.master);
    };
});
/* DECLARING MANAGEKEYVALUE CONTROLLER - ENDS */