const axios = require('axios')
const ACCESS_KEY = 'gIs9GuUEFCk2fVMWgKUxcXxSf6GN69FCtZR5F24yYV0'
const unsplashUrl = 'https://api.unsplash.com/photos'
const { client } = require('../redis');

const Mutation = {
    uploadImage: async (url, description, posterName) => {

    },
    updateImage: async (id, url, posterName, description, userPosted, binned) => {
    
    },
    deleteImage: async (id) => {

    }
}

module.exports = Mutation