'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    labels: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attach: {
      type: DataTypes.TEXT,
    },
    totalComments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {});
  tickets.associate = function(models) {
    const {
      teams,
      users,
    } = models;

    tickets.belongsToMany(teams, {
      through: 'ticketsTeams',
    });
    teams.belongsToMany(tickets, {
      through: 'ticketsTeams',
    });

    users.hasMany(tickets, { as: 'tickets', foreignKey: 'userId' });
    tickets.belongsTo(users, { as: 'users', foreignKey: 'userId' });
  };
  return tickets;
};
