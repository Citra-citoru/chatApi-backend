/**
 * the auth controller
 *

 */

const AuthService = require('./service');

/**
  * user login
  * @param req the http request
  * @param res the http response
  */
function* login(req, res, next) {
  try {
    const user = yield AuthService.login(req.body);
    res.status(200).json(user);
  } catch (ex) {
    next(ex);
  }
}
module.exports = {
  login
};
