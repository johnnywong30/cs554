const axios = require('axios')
const ACCESS_KEY = 'gIs9GuUEFCk2fVMWgKUxcXxSf6GN69FCtZR5F24yYV0'
const unsplashUrl = 'https://api.unsplash.com/photos'
const { client } = require('../redis');
const { checkPageNum } = require('../misc/validator')

const Query = {
    unsplashImages: async (pageNum) => {
        checkPageNum(pageNum)
        const headers = {
            Authorization: `Client-ID ${ACCESS_KEY}`
        }
        const { data } = await axios.get(
            `${unsplashUrl}/?${pageNum}`, 
            {headers}
        )
        const images = await Promise.all(data.map(async ({id, urls, user, description}) => {
            const url = urls.full
            const posterName = user.username
            const isBinned = await client.hExists('binnedHash', id)
            const userPosted = false
            const binned = isBinned ? true : false
            const ImagePost = {id, url, posterName, description, userPosted, binned}
            return ImagePost
            }
        ))
        return images
    },
    binnedImages: async () => {
        const binnedExists = await client.exists('binned')
        const binnedImages = binnedExists ? await client.get('binned') : []
        const images = binnedImages.map(JSON.parse)
        return images
    },
    userPostedImages: async () => {
        const postedImagesExists = await client.exists('postedImages')
        const postedImages = postedImagesExists ? await client.get('postedImages') : []
        const images = postedImages.map(JSON.parse)
        return images
    }
}

module.exports = Query