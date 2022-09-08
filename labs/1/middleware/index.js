const { sweetBelongsToUser, replyBelongsToUser } = require('../misc/helper');

const configMiddleware = (app) => {
  app.use('/sweets', async (req, res, next) => {
    if (req.method === 'POST') {
      const whitelist = ['/signup', '/login'];
      if (whitelist.includes(req.path)) {
        if (req.session.user) return res.status(403).json({ error: 'Cannot signup or login while already logged in!' });
      } else if (!req.session.user) return res.status(401).json({ error: 'Must be logged in for this request!' });
    }
    return next();
  });
  app.use('/sweets/:id', async (req, res, next) => {
    if (req.method === 'PATCH') {
      if (!req.session.user) return res.status(401).json({ error: 'Must be logged in!' });
      if (!sweetBelongsToUser(req, req.params.id)) {
        return res.status(403).json({ error: 'You are not the original author' });
      }
    }
    return next();
  });
  app.use('/sweets/:id/replies', async (req, res, next) => {
    if (req.method === 'POST') {
      if (!req.session.user) return res.status(401).json({ error: 'Must be logged in to reply!' });
    }
    return next();
  });
  app.use('/sweets/:sweetsId/:replyId', async (req, res, next) => {
    if (req.method === 'DELETE') {
      if (!req.session.user) return res.status(401).json({ error: 'Must be logged in to reply!' });
      const { sweetsId, replyId } = req.params;
      if (!replyBelongsToUser(req, sweetsId, replyId)) return res.status(403).json({ error: 'Cannot delete somebody else\'s reply' });
    }
    return next();
  });
};

module.exports = configMiddleware;
