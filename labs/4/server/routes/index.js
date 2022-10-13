const apiRouter = require('./api');

const constructorMethod = (app) => {
  app.use('/api', apiRouter);

  app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));
};

module.exports = constructorMethod;
