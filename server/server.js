/* eslint-disable no-console */
const cluster = require('cluster');

if (cluster.isMaster) {
  const cores = require('os').cpus();

  console.log('Master cluster setting up ' + cores.length + ' workers...');

  cores.forEach(() => {
    cluster.fork();
  });

  cluster.on('online', worker => {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const app = require('./app');
  const models = require('./models');

  models.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
  });
}

/* eslint-disable no-console */