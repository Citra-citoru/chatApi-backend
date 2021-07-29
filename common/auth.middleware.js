/**
 * Copyright (C) 2019 TopCoder Inc., All Rights Reserved.
 */

const jwt = require('express-jwt');
const config = require('config');
/**
  * get token from header or query
  * @param req
  * @return {*}
  */
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return req.query.token;
};

/**
  * the jwt check middleware
  * @type {middleware}
  */
const jwtCheck = jwt({
  secret: Buffer.from(config.CLIENT_SECRET, 'base64'),
  audience: config.CLIENT_ID,
  requestProperty: 'auth',
  algorithms: ['HS256'],
  getToken
});

/**
  * the auth middleware
  * first check token and then check the token in db
  * @param req
  * @param res
  * @param next
  */
function auth(req, res, next) {
  jwtCheck(req, res, (err) => {
    if (err) {
      next(err);
      return;
    }
    req.authUser = req.auth;
    next();
  });
}

/**
  * Export a function
  * @return {Function}       return the middleware function
  */
module.exports = () => auth;
