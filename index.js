const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schemaGraphQl = require('./graphql/Schema/schema.graphql');
const mergeResolvers = require('./graphql/Resolvers/resolvers');
const mongoose = require('mongoose');
const { uri, PORT } = require('./config');
const http = require('http');
const authenUser = require('./graphql/authenUser');

const startServer = async () => {
    try {
        await mongoose.set("useCreateIndex", true);
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('database is connected !!!!!!!!!');

        const app = express();
        const server = new ApolloServer({
            typeDefs: schemaGraphQl,
            resolvers: mergeResolvers,
            context: authenUser,
        });
        server.applyMiddleware({ app });
        const httpServer = http.createServer(app);
        server.installSubscriptionHandlers(httpServer);
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
            console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
        })
    } catch (error) {
        throw error;
    }

};

startServer();







