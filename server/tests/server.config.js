const app = require('../app');
const models = require('../models');

models.sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));  // eslint-disable-line no-console
});

module.exports = app;
