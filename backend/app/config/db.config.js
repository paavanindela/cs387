module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "chaithanya@868",
    DB: "project",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    PORT: 5432
  };