const express = require('express');
const { checkId } = require('./misc/validate');
const configRoutes = require('./routes');
const { client, connect } = require('./redis');

const app = express();
const port = 8000;

// redis middleware

app.use('/api/characters/:id', async (req, res, next) => {
  try {
    if (req.params.id.trim() === 'history') return next();
    checkId(req.params.id.trim());
    const characterExists = await client.hExists('characters', req.params.id.trim());
    if (characterExists) {
      const result = await client.hGet('characters', req.params.id.trim());
      await client.lPush('recentCharacters', req.params.id.trim());
      const characterData = JSON.parse(result);
      return res.status(200).json(characterData);
    }
    return next();
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});
app.use('/api/comics/:id', async (req, res, next) => {
  try {
    checkId(req.params.id.trim());
    const comicExists = await client.hExists('comics', req.params.id.trim());
    if (comicExists) {
      const result = await client.hGet('comics', req.params.id.trim());
      const comicData = JSON.parse(result);
      return res.status(200).json(comicData);
    }
    return next();
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});
app.use('/api/stories/:id', async (req, res, next) => {
  try {
    checkId(req.params.id.trim());
    const storyExists = await client.hExists('stories', req.params.id.trim());
    if (storyExists) {
      const result = await client.hGet('stories', req.params.id.trim());
      const storyData = JSON.parse(result);
      return res.status(200).json(storyData);
    }
    return next();
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
configRoutes(app);

app.listen(port, async () => {
  await connect();
  console.log("We've now got a server!");
  console.log(`Your routes will be running on http://localhost:${port}`);
});
