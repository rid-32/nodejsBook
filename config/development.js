module.exports = {
  port: process.env.PORT || 3000,
  maxUsers: Number(process.env.MAX_USERS_DEV) || 10,
};
