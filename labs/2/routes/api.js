const express = require('express');
// const flat = require('flat');
const { checkId } = require('../misc/validate');
const { getCharacter, getComic, getStory } = require('../data/marvel');
const { client } = require('../redis');

const apiRouter = express.Router();

apiRouter.route('/characters/history').get(async (req, res) => {
  try {
    const recentExists = await client.exists('recentCharacters');
    if (!recentExists) return res.status(200).json([]);
    const mostRecent = await client.lRange('recentCharacters', 0, 19);
    const mostRecentData = await Promise.all(
      mostRecent.map(async (id) => {
        const characterExists = await client.hExists('characters', id);
        if (!characterExists) throw new Error('How did that character get in here');
        // eslint-disable-next-line no-return-await
        const characterData = await client.hGet('characters', id);
        return JSON.parse(characterData);
      }),
    );
    return res.status(200).json(mostRecentData);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

apiRouter.route('/characters/:id').get(async (req, res) => {
  try {
    const characterId = checkId(Number(req.params.id.trim()));
    const characterData = await getCharacter(characterId);
    const { results } = characterData.data;
    const resultString = JSON.stringify(results[0]);
    await client.hSet('characters', req.params.id.trim(), resultString);
    await client.lPush('recentCharacters', req.params.id.trim());
    return res.status(200).json(results[0]);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

apiRouter.route('/comics/:id').get(async (req, res) => {
  try {
    const comicId = checkId(Number(req.params.id.trim()));
    const comicData = await getComic(comicId);
    const { results } = comicData.data;
    const resultString = JSON.stringify(results[0]);
    await client.hSet('comics', req.params.id.trim(), resultString);
    return res.status(200).json(results[0]);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

apiRouter.route('/stories/:id').get(async (req, res) => {
  try {
    const storyId = checkId(Number(req.params.id.trim()));
    const storyData = await getStory(storyId);
    const { results } = storyData.data;
    const resultString = JSON.stringify(results[0]);
    await client.hSet('stories', req.params.id.trim(), resultString);
    return res.status(200).json(results[0]);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

module.exports = apiRouter;
