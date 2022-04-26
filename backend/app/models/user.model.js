module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("controller", {
      username: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return User;
  };