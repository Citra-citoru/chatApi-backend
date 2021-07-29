'use strict';

/**
 * This service will provide database operation.
 */
const Joi = require('joi');
const logger = require('../../common/logger');
const models = require('../../models/index');
const { Message } = require('../../models');

function* addMessage(userId, messageId) {
  const lastMessage = yield Message.findByPk(messageId);
  const unRead = yield Message.count({ where: { sendTo: userId, isRead: false } });
  return yield models.users.findByPk(userId).then((user) => {
    if (!user) {
      return null;
    }
    user.addMessages(messageId);
    return user.update({ lastMessage: lastMessage.content, unRead });
  });
}

function createMessage(entity, id) {
  const { toId, content } = entity;
  return Message.create({
    sendTo: toId,
    content,
    createdBy: id,
    updatedBy: id
  });
}

createMessage.schema = {
  entity: Joi.object({
    toId: Joi.string().uuid().required(),
    content: Joi.string().required()
  }),
  id: Joi.string().uuid()
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
 * Get Messages By User Id
 * @param {Object} userId
 */
function* findMessagesByUserId(userId) {
  const message = yield models.users.findAll({
    where: { id: userId },
    include: [{ model: models.messages, as: 'messages' }]
  });
  return message;
}

/**
 * Get Message By message Id
 * @param {Object} id
 */
function* findMessageById(id) {
  const message = yield Message.findOne({ where: { id } })
    .then((msg) => msg.update({ isRead: true }));
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
  addMessage,
  createMessage,
  findMessages,
  findMessagesByUserId,
  findMessageById,
  updateMessage,
  deleteMessage
};

logger.buildService(module.exports);
