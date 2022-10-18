import axios from 'axios';
import md5 from 'blueimp-md5';

const API_ROUTE = '/api';

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

export const getCharacterHistory = async () => {
    const url = `${API_ROUTE}/characters/history`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export const getCharacterById = async (id) => {
    const url = `${API_ROUTE}/characters/${id}`
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export const getComicById = async (id) => {
    const url = `${API_ROUTE}/comics/${id}`
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw(e);
    }
}

export const getStoryById = async (id) => {
    const url = `${API_ROUTE}/stories/${id}`
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export const getCharacterPage = async (page) => {
    const url = `${API_ROUTE}/characters/page/${page}`
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export const getComicPage = async (page) => {
    const url = `${API_ROUTE}/comics/page/${page}`
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export const getStoryPage = async (page) => {
    const url = `${API_ROUTE}/stories/page/${page}`
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export const searchCharacters = async (name) => {
    const marvelApi = '/v1/public/characters';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}`
    const url = `${generateReqUrl(baseUrl)}&nameStartsWith=${name.trim()}`;
    const { data } = await axios.get(url);
    const results = data.data.results;
    return results;
}

export const searchComics = async (title) => {
    const marvelApi = '/v1/public/comics';
    const baseUrl = `https://gateway.marvel.com:443${marvelApi}`
    const url = `${generateReqUrl(baseUrl)}&titleStartsWith=${title.trim()}`;
    const { data } = await axios.get(url);
    const results = data.data.results;
    return results;
}

const api = {
    getCharacterHistory,
    getCharacterById,
    getComicById,
    getStoryById,
    getCharacterPage,
    getComicPage,
    getStoryPage,
    searchCharacters,
    searchComics
};

export default api;