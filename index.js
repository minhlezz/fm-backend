const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schemaGraphQl = require('./graphql/Schema/schema.graphql');
const mergeResolvers = require('./graphql/Resolvers/resolvers');
const mongoose = require('mongoose');
const { uri, PORT, API_URL } = require('./config');
const User = require('./models/user.model');
const Picture = require('./models/picture.model');
const getUser = require('./graphql/authenUser');
const Location = require('./models/location.model');

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
            context: ({ req, res }) => {
                const authUser = getUser(req)
                return {
                    req,
                    authUser,
                    User,
                    Picture,
                    Location
                }
            },
        });
        server.applyMiddleware({ app });
        app.listen({ port: PORT }, () => {
            console.log(`Server is running on ${API_URL}`)
        })
    } catch (error) {
        throw error;
    }

};

startServer();







