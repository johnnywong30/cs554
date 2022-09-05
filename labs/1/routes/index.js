// Name: Johnny Wong
// Course: CS-554-WS
// Date: September 8, 2022
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.

const constructorMethod = (app) => {
  // app.use('/bands', bandsRouter);
  // app.use('/albums', albumsRouter);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

module.exports = constructorMethod;
