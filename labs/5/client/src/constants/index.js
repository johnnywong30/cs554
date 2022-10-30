import { gql } from "@apollo/client";

const Query = {
    GET_UNSPLASH_IMAGES: gql`
        query UnsplashImages($pageNum: Int) {
            unsplashImages(pageNum: $pageNum) {
                id
                url
                posterName
                description
                userPosted
                binned
            }
        }
    `,
    GET_BINNED_IMAGES: gql`
        query BinnedImages {
            binnedImages {
                id
                url
                posterName
                description
                userPosted
                binned
            }
        }
    `,
    GET_POSTED_IMAGES: gql`
        query BinnedImages {
            userPostedImages {
                id
                url
                posterName
                description
                userPosted
                binned
            }
        }
    `
}

const Mutation = {
    UPLOAD_IMAGE: gql`
        mutation UploadImage(
            $url: String!, 
            $description: String, 
            $posterName: String
            ) {
            uploadImage(
                url: $url, 
                description: $description, 
                posterName: $posterName
                ) {
                id
                url
                posterName
                description
                userPosted
                binned
            }
        }
    `,
    UPDATE_IMAGE: gql`
        mutation UpdateImage(
            $id: ID!, 
            $url: String, 
            $posterName: String, 
            $description: String, 
            $userPosted: Boolean, 
            $binned: Boolean
            ) {
            updateImage(
                id: $id,
                url: $url,
                posterName: $posterName,
                description: $description,
                userPosted: $userPosted,
                binned: $binned
            ) {
                id
                url
                posterName
                description
                userPosted
                binned
              }
            }
    `,
    DELETE_IMAGE: gql`
        mutation DeleteImage($id: ID!) {
            deleteImage(id: $id) {
                id
                url
                posterName
                description
                userPosted
                binned
            }
        }
    `
}

const constants = {
    Query,
    Mutation
}

export default constants;