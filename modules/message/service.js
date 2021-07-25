'use strict';

/**
 * This service will provide database operation.
 */
const Joi = require('joi');
const logger = require('../../common/logger');
const { Message } = require('../../models');

/**
 * Create new message
 * @param {Object} message the new message
 */
function* createMessage(message) {
  const messageObj = yield Message.create(message);
  return messageObj;
}

createMessage.schema = {
  message: Joi.object({
    fromId: Joi.string().uuid().required(),
    toId: Joi.string().uuid().required(),
    content: Joi.string().required()
  })
};

/**
 * Get all Messages
 * @param {Object} messageQuery
 */
function* findMessages(messageQuery) {
  const message = yield Message.findAll(messageQuery);
  return message;
}

findMessages.schema = {
  messageQuery: Joi.object({
    content: Joi.string()
  })
};

/**
 * Get By User Content
 * @param {Object} someString
 */
function* findMessageByContent(someString) {
  const searchFor = '%' + someString + '%';
  const message = yield Message.findAll({ where: { searchFor } });
  return message;
}
/**
 * Update message
 * @param {*} message
 * @param {*} id
 */
function* updateMessage(message, id) {
  const messageObj = yield Message.update(message, { where: { id } });
  return messageObj;
}

updateMessage.schema = {
  message: Joi.object({
    fromId: Joi.string().uuid().required(),
    toId: Joi.string().uuid().required(),
    content: Joi.string().required(),
    isRead: Joi.boolean().required()
  }),
  id: Joi.string().uuid()
};

/**
 * Update Message by id
 * @param {*} test
 * @param {*} id
 */
function* deleteMessage(id) {
  const messageObj = yield Message.destroy({ where: { id } });
  return messageObj;
}

module.exports = {
  createMessage,
  findMessages,
  findMessageByContent,
  updateMessage,
  deleteMessage
};

logger.buildService(module.exports);
