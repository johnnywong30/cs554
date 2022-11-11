const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { json } = require('body-parser');
const { connect, client } = require('./redis');
const { typeDefs, resolvers } = require('./schema');
const { checkPageNum, checkId } = require('./misc/validator');
const configRoutes = require('./routes');

const PORT = 4000

// source: https://www.apollographql.com/docs/apollo-server/migration/#migrate-from-apollo-server-express
const startApolloServer = async () => {
    // connect to Redis
    await connect();
    // start Express server
    const app = express();
    app.use(cors());
    const httpServer = http.createServer(app);
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    // start ApolloServer
    await server.start();
    // start of Express middleware and routes here
    // middleware
    app.use(express.json());
    app.use(
        '/graphql',
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    )
    app.use(express.urlencoded({ extended: true }));
    // middleware for pokemon page
    app.use('/pokemon/page/:pagenum', async (req, res, next) => {
        try {
            const pageNum = checkPageNum(req.params.pagenum);
            const isCached = await client.hExists('page', pageNum);
            if (isCached) {
                const pokemonPageString = await client.hGet('page', pageNum);
                const pokemonPage = JSON.parse(pokemonPageString);
                return res.status(200).json(pokemonPage);
            }
            return next();
        } catch (e) {
            return res.status(404).json({ error: e.message });
        }
    })
    // middleware for pokemon by id
    app.use('/pokemon/:id', async (req, res, next) => {
        try {
            if (req.params.id.trim() === 'page') return next();
            const id = checkId(req.params.id.trim());
            const isCached = await client.hExists('pokemon', id);
            if (isCached) {
                const pokemonString = await client.hGet('pokemon', id); 
                const pokemon = JSON.parse(pokemonString);
                return res.status(200).json(pokemon);
            }
            return next();
        } catch (e) {
            return res.status(404).json({ error: e.message });
        }
    })
    // routes
    configRoutes(app);
    // end of middleware and routes
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Express Server ready at http://localhost:${PORT}/`);
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer();

