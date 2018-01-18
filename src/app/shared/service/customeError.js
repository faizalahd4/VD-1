/**
 *
 * CUSTOME ERROR FILE USING FOR NODEJS, MONGO & ANGULAR CODE TESTING APPLICATION.
 * @AUTHOR - FAIZAL
 * @DATE - 16/12/2018
**/
module.exports = function CustomError(message, status) {
  /* SAVE THE ERROR MESSAGE */
  this.message = message
  /* CAPTURING STACK TRACE, EXCLUDING CONSTRUCTOR CALL FROM IT. */
  Error.captureStackTrace(this, this.constructor);
  /* `500` IS THE DEFAULT VALUE IF NOT SPECIFIED. */
  this.status = status || 500; 
};