'use strict';

/**
 * This controller exposes database REST action.
 */
const service = require('./service');

/**
 * Create Message
 * @param req the request
 * @param res the response
 */
function* createMessage(req, res, next) {
  try {
    const message = yield service.createMessage(req.body);
    res.status(201).json(message);
  } catch (ex) {
    next(ex);
  }
}

/**
 * Update Message by id
 * @param req the request
 * @param res the response
 */

function* updateMessage(req, res, next) {
  try {
    const messages = yield service.updateMessage(req.body, req.params.id);
    res.status(200).json(messages);
  } catch (ex) {
    next(ex);
  }
}

/* delete Message by id
 * @param req the request
 * @param res the response
 */

function* deleteMessage(req, res, next) {
  try {
    const Messages = yield service.deleteMessage(req.params.id);
    res.status(200).json(Messages);
  } catch (ex) {
    next(ex);
  }
}

/**
 * get Messages by UserId
 * @param req the request
 * @param res the response
 */
function* getMessagesByUserId(req, res, next) {
  try {
    const messages = yield service.findMessagesByUserId(req.params.id);
    res.status(200).json(messages);
  } catch (ex) {
    next(ex);
  }
}

/**
 * get Messages by UserId
 * @param req the request
 * @param res the response
 */

function* getMessageById(req, res, next) {
  try {
    const message = yield service.findMessageById(req.params.id);
    res.status(200).json(message);
  } catch (ex) {
    next(ex);
  }
}

/**
 * get all Message
 * @param req the request
 * @param res the response
 */
function* getMessages(req, res, next) {
  try {
    const messages = yield service.findMessages(req.query);
    res.status(200).json(messages);
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  createMessage,
  getMessages,
  getMessagesByUserId,
  getMessageById,
  updateMessage,
  deleteMessage
};
