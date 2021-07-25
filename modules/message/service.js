'use strict';

/**
 * This service will provide database operation.
 */
const Joi = require('joi');
const Sequelize = require('sequelize');
const path = require('path');
const logger = require('../../common/logger');
const { Message } = require('../../models');

const env = process.env.NODE_ENV || 'development';

// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirname, '../../config/config.json'))[env];
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
 * Get Messages By User Id
 * @param {Object} userId
 */
function* findMessagesByUserId(userId) {
  const sequelize = new Sequelize(config.database, config.username, config.password, config);
  const messages = yield sequelize.query(
    `select 
    f.name as fromName,
    t.name as toName,
    m.content,
    (SELECT m.content
    FROM messages as m
    WHERE (m.fromId=:id or m.toId=:id) order by createdAt desc limit 1)  as lastMessage,
    (SELECT Count(*) 
    FROM messages as m
    WHERE (m.fromId=:id or m.toId=:id) and isRead=false) as UnRead
    from messages as m
    left join users as t on t.id= m.toId
    left join users as f on f.id= m.fromId
    where (m.fromId=:id or m.toId=:id)
    `,
    { replacements: { id: userId } },
    { type: sequelize.QueryTypes.SELECT }
  );
  return messages;
}

/**
 * Get Meesage By message Id
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
  createMessage,
  findMessages,
  findMessagesByUserId,
  findMessageById,
  updateMessage,
  deleteMessage
};

logger.buildService(module.exports);
