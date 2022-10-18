import axios from 'axios';

const API_ROUTE = '/api';

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

const api = {
    getCharacterHistory,
    getCharacterById,
    getComicById,
    getStoryById,
    getCharacterPage,
    getComicPage,
    getStoryPage
};

export default api;