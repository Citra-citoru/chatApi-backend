'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    fromId: {
      type: DataTypes.UUID
    },
    toId: {
      type: DataTypes.UUID
    },
    content: {
      type: DataTypes.STRING
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Message;
};
