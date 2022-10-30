const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const resolvers = require('./resolvers')
const { connect } = require('./redis');

const PORT = 4000

const typeDefs = `#graphql
    type Query {
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
    }

    type ImagePost {
        id: ID!
        url: String!
        posterName: String!
        description: String
        userPosted: Boolean!
        binned: Boolean!
    }

    type Mutation {
        uploadImage(
            url: String!, 
            description: String, 
            posterName: String
        ): ImagePost

        updateImage(
            id: ID!, 
            url: String, 
            posterName: String, 
            description: String, 
            userPosted: Boolean, 
            binned: Boolean
        ): ImagePost

        deleteImage(id: ID!): ImagePost
    }
    
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests


const start = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });
    await connect();
    console.log(`🚀  Server ready at: ${url}`);
}

start()
