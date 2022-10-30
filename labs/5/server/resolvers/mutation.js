const axios = require('axios')
const ACCESS_KEY = 'gIs9GuUEFCk2fVMWgKUxcXxSf6GN69FCtZR5F24yYV0'
const unsplashUrl = 'https://api.unsplash.com/photos'
const { client } = require('../redis');
const { v4: uuidv4 } = require('uuid')
const { checkString, checkId } = require('../misc/validator');
const { userPostedImages } = require('./query');

// binned has a corresponding hash holding ids and ImagePostStrings
// postedImages has a corresponding hash holding ids and ImagePostStrings

const Mutation = {
    uploadImage: async (url, description, posterName) => {
        const imgUrl = checkString(url)
        const id = uuidv4()
        const ImagePost = {
            id,
            url: imgUrl,
            posterName: posterName ? checkString(posterName) : null,
            description: description ? checkString(description) : null,
            userPosted: true,
            binned: false
        }
        const ImagePostString = JSON.stringify(ImagePost)
        await client.hSet('postedHash', id, ImagePostString)
        await client.lPush('postedImages', ImagePostString)
        return ImagePost
    },
    updateImage: async (id, url, posterName, description, userPosted, binned) => {
        const imgId = checkString(id) // unsplash id is not a uuid... will break my checkId
        const postedImgExists = await client.hExists('postedHash', uuid)
        const binnedImgExists = await client.hExists('binnedHash', uuid)
        let ImagePost;
        // Image not in cache
        if (!postedImgExists && !binnedImgExists) {
            /*
            If this image was not previously in the cache, 
            and the user bins it, then add it to the cache using 
            data from React state. 
            */
            ImagePost = {
                id: imgId,
                url: checkString(url),
                posterName: checkString(posterName),
                description: description ? checkString(description) : null,
                userPosted,
                binned
            }
            const ImagePostString = JSON.stringify(ImagePost)
            if (binned) {
                await client.lPush('binned', ImagePostString)
                await client.hSet('binnedHash', imgId, ImagePostString)
            }
            if (userPosted) {
                await client.lPush('postedImages', ImagePostString)
                await client.hSet('postedHash', imgId, ImagePostString)
            }
        }
        if (postedImgExists) {
            // fetch from postedHash
            const ImagePostString = await client.hGet('postedHash', imgId)
            ImagePost = JSON.parse(ImagePostString)
            // update it
            const UpdatedImagePost = {
                ...ImagePost,
                url: url ? checkString(url) : ImagePost.url,
                posterName: posterName ? checkString(posterName) : ImagePost.posterName,
                description: description ? checkString(description) : ImagePost.description,
                userPosted: userPosted ? userPosted : ImagePost.userPosted,
                binned: binned ? binned: ImagePost.binned
            }
            // cache it
            const UpdatedImagePostString = JSON.stringify(UpdatedImagePost)
            // replace it
            await client.lRem('postedImages', ImagePostString)
            await client.lPush('postedImages', UpdatedImagePostString)
            await client.hSet('postedHash', imgId, UpdatedImagePostString)
            ImagePost = UpdatedImagePost
        }
        if (binnedImgExists) {
            // fetch from binnedHash
            const ImagePostString = await client.hGet('binnedHash', imgId)
            ImagePost = JSON.parse(ImagePostString)
            // update it
            const UpdatedImagePost = {
                ...ImagePost,
                url: url ? checkString(url) : ImagePost.url,
                posterName: posterName ? checkString(posterName) : ImagePost.posterName,
                description: description ? checkString(description) : ImagePost.description,
                userPosted: userPosted ? userPosted : ImagePost.userPosted,
                binned: binned ? binned: ImagePost.binned
            }
            // cache it
            const UpdatedImagePostString = JSON.stringify(UpdatedImagePost)
            // replace it
            await client.lRem('binned', ImagePostString)
            await client.hDel('binnedHash', imgId)
            if (UpdatedImagePost.binned) {
                await client.lPush('binned', UpdatedImagePostString)
                await client.hSet('binnedHash', imgId, UpdatedImagePostString)
            }
            ImagePost = UpdatedImagePost
        }
        return ImagePost
    },
    deleteImage: async (id) => {
        const uuid = checkId(id)
        const imgExists = await client.hExists('postedHash', uuid)
        let ImagePost;
        if (imgExists) {
            ImagePost = await client.hGet('postedHash', uuid)
            await client.lRem('postedImages', ImagePost)
            await client.hDel('postedHash', uuid)
        }
        const imgBinned = await client.hExists('binnedHash', uuid)
        if (imgBinned) {
            ImagePost = await client.hGet('binnedHash', uuid)
            await client.lRem('binned', ImagePost)
            await client.hDel('binnedHash', uuid)
        }
        return ImagePost
    }
}

module.exports = Mutation