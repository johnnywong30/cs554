const configMiddleware = (app) => {
  app.use('/sweets', async (req, res, next) => {
    if (req.method === 'POST') {
      const whitelist = ['/signup', '/login'];
      if (whitelist.includes(req.path)) {
        if (req.session.user) return res.status(400).json({ error: 'Cannot signup or login while already logged in!' });
      } else if (!req.session.user) return res.status(403).json({ error: 'Must be logged in for this request!' });
    }
    if (req.method === 'PUT') {
      if (!req.session.user) return res.status(403).json({ error: 'Must be logged in for this request!' });
      // TODO: match logged in user with posted Sweet user id
    }
    if (req.method === 'PATCH') {
      if (!req.session.user) return res.status(403).json({ error: 'Must be logged in for this request!' });
      // TODO: match logged in user with posted Sweet user id
    }
    return next();
  });
};

module.exports = configMiddleware;
