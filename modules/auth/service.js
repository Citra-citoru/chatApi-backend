'use strict';

/**
 * This service will provide database operation.
 */
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const dParse = require('parse-duration');
const logger = require('../../common/logger');
const errors = require('../../common/errors');
const { User } = require('../../models');

/**
 * user login
 * @param entity the login entity
 */

function generateToken(user) {
  return jwt.sign(user, Buffer.from(config.CLIENT_SECRET, 'base64'), {
    expiresIn: dParse(config.ACCESS_TOKEN_TTL),
    audience: config.CLIENT_ID
  });
}

/**
 * to json
 * @param dbUser the database user
 * @return {Promise<void>}
 */
function toJSON(dbUser) {
  const ret = dbUser.toJSON();
  return ret;
}

function* login(entity) {
  const user = yield User.findOne({ where: { name: entity.name } });
  const password = bcrypt.compareSync(entity.password, user.password);
  if (!user) {
    throw errors.BadRequestError('invalid name');
  }

  if (!password) {
    throw errors.BadRequestError('invalid password');
  }

  const updateUser = new User({
    name: user.name,
    password: user.password,
    lastSeen: new Date().getTime()
  });

  const userObj = yield User.update(updateUser, { where: { name: entity.name } });

  const ret = userObj ? toJSON(updateUser) : updateUser;
  return {
    token: generateToken(ret)
  };
}

login.schema = {
  entity: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
  })
};

module.exports = {
  login
};

logger.buildService(module.exports);
