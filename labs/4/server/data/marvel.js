const axios = require('axios');
const md5 = require('blueimp-md5');
const { checkId, checkPage } = require('../misc/validate');
// very secure
const publicKey = '761aa5e8b04bbdc723cb3b2a0e732f70';
const privateKey = '9cacff382c0038ba96f4ba30c1d69f8a934c9ca2';

const getTimeStamp = () => new Date().getTime();

const getHash = (ts) => {
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  return hash;
};

const generateReqUrl = (baseUrl) => {
  const ts = getTimeStamp();
  const hash = getHash(ts);
  return `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};

const calculateOffset = (pagenum, limit = 20) => {
  const page = Number(checkPage(pagenum));
  const offset = pagenum <= 1 ? 0 : (limit * page) - limit;
  return offset
}

module.exports = {
  getCharacter: async (id) => {
    // check id
    const characterId = checkId(id);
    const marvelApi = '/v1/public/characters';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}/${characterId}`;
    const url = generateReqUrl(baseUrl);
    const { data } = await axios.get(url);
    return data;
  },
  getComic: async (id) => {
    const comicId = checkId(id);
    const marvelApi = '/v1/public/comics/';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}/${comicId}`;
    const url = generateReqUrl(baseUrl);
    const { data } = await axios.get(url);
    return data;
  },
  getStory: async (id) => {
    const storyId = checkId(id);
    const marvelApi = '/v1/public/stories/';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}/${storyId}`;
    const url = generateReqUrl(baseUrl);
    const { data } = await axios.get(url);
    return data;
  },
  getCharacterPage: async (pagenum) => {
    const page = checkPage(pagenum)
    const marvelApi = '/v1/public/characters';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}`;
    const limit = 20;
    const offset = calculateOffset(page, limit);
    const url = `${generateReqUrl(baseUrl)}&limit=${limit}&offset=${offset}`;
    const { data } = await axios.get(url);
    return data;
  },
  getComicPage: async (pagenum) => {
    const page = checkPage(pagenum)
    const marvelApi = '/v1/public/comics';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}`;
    const limit = 20;
    const offset = calculateOffset(page, limit);
    const url = `${generateReqUrl(baseUrl)}&limit=${limit}&offset=${offset}`;
    const { data } = await axios.get(url);
    return data;
  },
  getStoryPage: async (pagenum) => {
    const page = checkPage(pagenum)
    const marvelApi = '/v1/public/stories';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}`;
    const limit = 20;
    const offset = calculateOffset(page, limit);
    const url = `${generateReqUrl(baseUrl)}&limit=${limit}&offset=${offset}`;
    const { data } = await axios.get(url);
    return data;
  }
};
