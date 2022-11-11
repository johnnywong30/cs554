const pokemonRouter = require('./pokemon')

const constructorMethod = (app) => {
  app.use('/pokemon', pokemonRouter);
  app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));
};

module.exports = constructorMethod;
