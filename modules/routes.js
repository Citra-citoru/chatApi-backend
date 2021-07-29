'use strict';

/**
 * Contains all routes.
 */
const auth = require('../common/auth.middleware');

module.exports = {
  '/login': {
    post: {
      controller: '/auth/controller',
      method: 'login'
    }
  },
  '/users': {
    post: {
      controller: '/user/controller',
      method: 'createUser'
    },
    get: {
      controller: '/user/controller',
      method: 'getUsers',
      middleware: auth()
    }
  },
  '/users/:id': {
    get: {
      controller: '/user/controller',
      method: 'getUserById',
      middleware: auth()
    },
    put: {
      controller: '/user/controller',
      method: 'updateUser',
      middleware: auth()
    },
    delete: {
      controller: '/user/controller',
      method: 'deleteUser',
      middleware: auth()
    }
  },
  '/messages': {
    post: {
      controller: '/message/controller',
      method: 'createMessage',
      middleware: auth()
    },
    get: {
      controller: '/message/controller',
      method: 'getMessages',
      middleware: auth()
    }
  },
  '/messages/:id': {
    get: {
      controller: '/message/controller',
      method: 'getMessagesByUserId',
      middleware: auth()
    },
    put: {
      controller: '/message/controller',
      method: 'updateMessage',
      middleware: auth()
    },
    delete: {
      controller: '/message/controller',
      method: 'deleteMessage',
      middleware: auth()
    }
  },
  '/message/:id': {
    get: {
      controller: '/message/controller',
      method: 'getMessageById',
      middleware: auth()
    }
  }
};
