var uuid = require("uuid");
var logger = rootRequire("common/logger");

var response  = {
  OK : {
    code: 200,
    summary: 'OK',
    httpStatus: 200,
    level: 'info',
    detail: "OK"
  },
  DB_ERR : {
    code: 100,
    summary: 'Database Error',
    httpStatus: 500,
    level: 'critical',
    detail: "Error returned from database: %s"
  },
  DB_DUP_EMAIL : {
    code: 101,
    summary: 'Email address already registered',
    httpStatus: 400,
    level: 'alert',
    detail:"Attempt to create new user for existing user %s from %s",
  },
  TOO_MANY_ATTEMPTS : {
    code: 102,
    summary: "Too many attempts from this IP address",
    httpStatus: 429,
    level: 'alert',
    detail: "Too many attempts from this IP [%s]"
  },
  INVALID_EMAIL : {
    code: 103,
    summary: "Invalid email address provided",
    httpStatus: 400,
    level: 'error',
    detail: 'Invalid email address provided, %s from %s'

  },
  USER_NOT_CREATED : {
    code: 104,
    summary: "Error creating new user",
    detail: "Error creating new user for %s [%s] - %s",
    httpStatus: 400,
    level: "error"
  },
  TMP_USER_CREATED : {
    code: 105,
    summary: "New user registered. Check registered email for activation link.",
    detail: "New temp user registered: %s [%s]",
    httpStatus: 200,
    level: "alert"
  },
  UNAUTH_CONFIRM : {
    code: 106,
    summary: "Unauthorised confirmation",
    detail: "New User Confirmation attempt failed from %s",
    httpStatus: 403,
    level: "alert"
  },
  TMP_USER_LOCKED : {
    code: 107,
    summary: "User record locked",
    detail: "User with email %s is locked",
    httpStatus: 400,
    level: "info"
  },
  SERVER_FAIL : {
    code: 108,
    summary: "Server Error",
    detail: "Error: %S",
    httpStatus: 500,
    level: "critical"
  },
  USER_CREATED : {
    code: 109,
    summary: "New User Created",
    detail: "User %s created",
    httpStatus: 200,
    level: "info"
  },
  INVALID_PARAM : {
    code: 110,
    summary: "The parameters provided are incorrect. Please refer to API documentation.",
    detail: "Parameter %s was incorrect: value was '%s'",
    httpStatus: 400,
    level: "warn"
  },
  LIST_ISSUED : {
    code: 111,
    summary: "List Issued",
    detail: "Competition List Issued for %s",
    httpStatus: 200,
    level: "info"
  },
  AUTH_FAIL_USERNAME : {
    code: 112,
    summary: "Authentication Failed",
    detail: "Authentication Failure: Username not found %s",
    httpStatus: 403,
    level: "warn"
  },
  AUTH_FAIL_PASSWORD : {
    code: 113,
    summary: "Authentication Failed",
    detail: "Authentication Failure: password incorrect for %s",
    httpStatus: 403,
    level: "warn"
  },
  TOKEN_ISSUED : {
    code: 114,
    summary: "token issued",
    detail: "Token Issued for %s",
    httpStatus: 200,
    level: "info"
  },
  TOKEN_NOT_FOUND : {
    code: 115,
    summary: "no token found in request",
    detail: "no token found in request from %s",
    httpStatus: 403,
    level: "info"
  },
  TOKEN_NOT_AUTHENTICATED : {
    code: 116,
    summary: "token not able to be authenticated",
    detail: "token not able to be authenticated from %s",
    httpStatus: 403,
    level: "info"
  },
  COMPETITION_NOT_FOUND : {
    code: 117,
    summary: "specified competition does not exist or has not been specified",
    detail: "competition with ID %s does not exist or has not been specified",
    httpStatus: 400,
    level: "info"
  },
  USER_NOT_FOUND : {
    code: 118,
    summary: "specified user does not exist",
    detail: "user with ID %s does not exist",
    httpStatus: 400,
    level: "info"
  },
  UNAUTHORIZED : {
    code: 119,
    summary: "User is not authorized for this action",
    detail: "user with ID %s is not authorized for thie request",
    httpStatus: 401,
    level: "info"
  },
  EMAIL_NOT_FOUND : {
    code: 120,
    summary: "User email was not found",
    detail: "The email address given was not found",
    httpStatus: 403,
    level: "info"
  },
  RECAPTCHA_ERROR : {
    code: 121,
    summary: "recaptcha token verification failed",
    detail: "The recaptcha code provided could not be verified",
    httpStatus: 403,
    level: "info"
  },
  USER_NOT_VALIDATED : {
    code: 122,
    summary: "The user has not been validated",
    detail: "The user has not clicked on their validation link yet",
    httpStatus: 402,
    level: "info"
  },
  USERNAME_TAKEN : {
    code: 123,
    summary: "Username not available",
    detail: "Creation of username %s failed: duplicate entry",
    httpStatus: 400,
    level: "info"
  },
  NO_VALIDATION_TOKEN : {
    code: 124,
    summary: "No Validation Token",
    detail: "Validation token was not provided",
    httpStatus: 403,
    level: "info"
  },
  INVALID_VALIDATION_TOKEN : {
    code: 125,
    summary: "Invalid Validation Token",
    detail: "Validation token was not valid",
    httpStatus: 403,
    level: "info"
  },
  COMPETITION_CLOSED: {
    code: 125,
    summary: "Competition Closed for Entries",
    detail: "COmpetition entry close date has passed",
    httpStatus: 403,
    level: "info"
  },
  RESULT_NOT_PUBLISHED: {
    code: 126,
    summary: "This competition has not yet published its results",
    detail: "No results available at this time",
    httpStatus:403,
    level: "info"
  },



  //--------------------------------------------
  httpRespond: function(res,info)
  {
    var responseInfo = info.code;
    var responseData = info.data || [];
    var responseDetail = info.detail || [];
    var responseError= info.error || null;

    /*
    responseData.unshift(responseInfo.detail);
    responseData.unshift(responseInfo.level);
    responseData.push({uuid:uuid.v4(), code: responseInfo.code});

    logger.log.apply(logger, responseData);
    */

    if(responseInfo.httpStatus == 200){
      res.set('Access-Control-Allow-Origin','*');
      res.set('X-My-Tok','ssss');
      res.status(responseInfo.httpStatus).
        json(responseDetail);
        return;
    } else {
      res.set('Access-Control-Allow-Origin','*');
      let responseObject = {
          code: responseInfo.httpStatus,
          status: responseInfo.summary,
          detail: info.detail
      };
      if(responseError){
        responseObject.error = responseError.toString();
        responseObject.stack = responseError.stack;
      }
      res.status(responseInfo.httpStatus).  json(responseObject);
      return;
    }
  },
  httpRedirect: function(res, info){
    var logData=[];
    var redirectPath=info.path;

    logData.push(info.detail);
    logData.push({uuid:uuid.v4(), code: 301});
    logger.log.apply(logger, logData);

    res.redirect(redirectPath);
  },
  httpErrorRespond: function(res,info)
  {
    var responseObject;

    if(typeof info === "Error"){
      responseObject={
        code: this.DB_ERR.httpStatus,
        status: this.DB_ERR.summary,
        detail: "No further detail provided"
      };
    } else {
      responseObject={
        code: info.code.httpStatus,
        status: info.code.summary,
        detail: info.detail
      };
    }

    res.set('Access-Control-Allow-Origin','*');
    res.status(responseObject.code).  json(responseObject);
    return;
  },
}


module.exports = response;
