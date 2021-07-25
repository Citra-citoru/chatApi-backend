'use strict';

/**
 * This controller exposes database REST action.
 */

const service = require('./services');

/**
 * Create user
 * @param req the request
 * @param res the response
 */
function* createUser(req, res, next) {
  try {
    const user = yield service.createUser(req.body);
    res.status(201).json(user);
  } catch (ex) {
    next(ex);
  }
}

/**
 * Update user by id
 * @param req the request
 * @param res the response
 */

function* updateUser(req, res, next) {
  try {
    const users = yield service.updateUser(req.body, req.params.id);
    res.status(200).json(users);
  } catch (ex) {
    next(ex);
  }
}

/* delete test by id
 * @param req the request
 * @param res the response
 */

function* deleteUser(req, res, next) {
  try {
    const users = yield service.deleteUser(req.params.id);
    res.status(200).json(users);
  } catch (ex) {
    next(ex);
  }
}

/**
 * get test by id
 * @param req the request
 * @param res the response
 */
function* getUserById(req, res, next) {
  try {
    const users = yield service.findUserById(req.params.id);
    res.status(200).json(users);
  } catch (ex) {
    next(ex);
  }
}

/**
 * get all test
 * @param req the request
 * @param res the response
 */
function* getUsers(req, res, next) {
  try {
    const tests = yield service.findUsers(req.query);
    res.status(200).json(tests);
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
