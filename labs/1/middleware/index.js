const { sweetBelongsToUser } = require('../misc/helper');

const configMiddleware = (app) => {
  app.use('/sweets', async (req, res, next) => {
    if (req.method === 'POST') {
      const whitelist = ['/signup', '/login'];
      if (whitelist.includes(req.path)) {
        if (req.session.user) return res.status(400).json({ error: 'Cannot signup or login while already logged in!' });
      } else if (!req.session.user) return res.status(403).json({ error: 'Must be logged in for this request!' });
      if (req.params.id && !sweetBelongsToUser(req)) return res.status(403).json({ error: 'You are not the original poster' });
    }
    if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
      if (!req.session.user) return res.status(403).json({ error: 'Must be logged in for this request!' });
      if (req.params.id && !sweetBelongsToUser(req, req.params.id)) return res.status(403).json({ error: 'You are not the original author' });
      if (req.params.sweetId && !sweetBelongsToUser(req, req.params.sweetId)) return res.status(403).json({ error: 'You are not the original author' });
    }
    return next();
  });
};

module.exports = configMiddleware;
