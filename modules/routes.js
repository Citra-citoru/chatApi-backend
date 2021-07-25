'use strict';

/**
 * Contains all routes.
 */

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
      method: 'getUsers'
    }
  },
  '/users/:id': {
    get: {
      controller: '/user/controller',
      method: 'getUserById'
    },
    put: {
      controller: '/user/controller',
      method: 'updateUser'
    },
    delete: {
      controller: '/user/controller',
      method: 'deleteUser'
    }
  },
  '/messages': {
    post: {
      controller: '/message/controller',
      method: 'createMessage'
    },
    get: {
      controller: '/message/controller',
      method: 'getMessages'
    }
  },
  '/messages/:id': {
    get: {
      controller: '/message/controller',
      method: 'getMessagesByUserId'
    },
    put: {
      controller: '/message/controller',
      method: 'updateMessage'
    },
    delete: {
      controller: '/message/controller',
      method: 'deleteMessage'
    }
  },
  '/message/:id': {
    get: {
      controller: '/message/controller',
      method: 'getMessageById'
    }
  }
};
