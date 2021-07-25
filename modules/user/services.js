'use strict';

/**
 * This service will provide database operation.
 */
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const logger = require('../../common/logger');
const { User } = require('../../models');

/**
 * Create new user
 * @param {Object} user the new user
 */
function* createUser(user) {
  const userBody = {
    name: user.name,
    password: bcrypt.hashSync(user.password, 8)
  };

  const userObj = yield User.create(userBody);
  return userObj;
}

/**
 * Get all Users
 * @param {Object} UserQuery
 */
function* findUsers(userQuery) {
  const user = yield User.findAll(userQuery);
  return user;
}

findUsers.schema = {
  userQuery: Joi.object({
    name: Joi.string()
  })
};

/**
 * Get By User Id
 * @param {Object} id
 */
function* findUserById(id) {
  const user = yield User.findOne({ where: { id } });
  return user;
}

/**
 * Update User
 * @param {*} user
 * @param {*} id
 */
function* updateUser(user, id) {
  const userObj = yield User.update(user, { where: { id } });
  return userObj;
}

updateUser.schema = {
  user: Joi.object({
    name: Joi.string(),
    lastSeen: Joi.date()
  }),
  id: Joi.string().uuid()
};

/**
 * Update User by id
 * @param {*} userObj
 * @param {*} id
 */
function* deleteUser(id) {
  const userObj = yield User.destroy({ where: { id } });
  return userObj;
}

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser
};

logger.buildService(module.exports);
