const express = require('express');
const { checkId, checkPage } = require('../misc/validate');
const { getCharacter, getComic, getStory, getCharacterPage, getComicPage, getStoryPage } = require('../data/marvel');
const { client } = require('../redis');

const apiRouter = express.Router();

apiRouter.route('/characters/history').get(async (req, res) => {
  try {
    const recentExists = await client.exists('recentCharacters');
    if (!recentExists) return res.status(200).json([]);
    const mostRecent = await client.lRange('recentCharacters', 0, 19); // todo check this for 20
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
    const characterId = checkId(req.params.id.trim());
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
    const comicId = checkId(req.params.id.trim());
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
    const storyId = checkId(req.params.id.trim());
    const storyData = await getStory(storyId);
    const { results } = storyData.data;
    const resultString = JSON.stringify(results[0]);
    await client.hSet('stories', req.params.id.trim(), resultString);
    return res.status(200).json(results[0]);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

apiRouter.route('/characters/page/:pagenum').get(async (req, res) => {
  try {
    const pagenum = checkPage(req.params.pagenum.trim());
    const characterPage = await getCharacterPage(pagenum);
    const { results } = characterPage.data;
    const resultString = JSON.stringify(results);
    await client.hSet('characterPages', pagenum, resultString);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

apiRouter.route('/comics/page/:pagenum').get(async (req, res) => {
  try {
    const pagenum = checkPage(req.params.pagenum.trim());
    const comicPage = await getComicPage(pagenum);
    const { results } = comicPage.data;
    const resultString = JSON.stringify(results);
    await client.hSet('comicPages', pagenum, resultString);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

apiRouter.route('/stories/page/:pagenum').get(async (req, res) => {
  try {
    const pagenum = checkPage(req.params.pagenum.trim());
    const storyPage = await getStoryPage(pagenum);
    const { results } = storyPage.data;
    const resultString = JSON.stringify(results);
    await client.hSet('storyPages', pagenum, resultString);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

module.exports = apiRouter;
