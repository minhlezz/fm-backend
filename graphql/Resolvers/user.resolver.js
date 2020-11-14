const { AuthenticationError, UserInputError } = require('apollo-server-express');
const errorMessage = require('../../errorMessage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');

module.exports = {
    Query: {
        user: async (parent, args, { User }) => {
            const userInfo = await User.findOne({ _id: args.id });
            return userInfo;
        },
        users: async (parent, args, { User, authUser }) => {

            if (!authUser) {
                throw new AuthenticationError(errorMessage.auth.unAuth);
            }
            const currentUser = await User.findById({ _id: authUser.userId });
            if (currentUser) {
                const users = await User.find();
                return users;
            }


        },

    },
    Mutation: {
        register: async (parent, args, { User }) => {
            try {
                //Check user input
                if (!args.input.email || !args.input.password) {
                    throw new UserInputError('ErrorInput', { errors });
                }

                //check user is existing
                const existingUser = await User.findOne({ email: args.input.email });
                if (existingUser) {
                    throw new Error(errorMessage.register.existingUser);
                }

                // const hashedPassword = await bcrypt.hash(args.input.password, 12);
                // const user = await new User({
                //     email: args.input.email,
                //     password: hashedPassword
                // });
                // const result = await user.save();
                // return {
                //     ...result._doc,
                //     id: result.id,
                //     password: null
                // }
                args.input.password = await bcrypt.hash(args.input.password, 12);
                const user = await new User(args.input).save();
                return {
                    ...user._doc,
                    password: null
                };
            } catch (error) {
                console.log('error in register progress!!');
                throw error
            }
        },

        login: async (parent, { email, password }, { User }) => {

            const user = await User.findOne({ email });
            if (!user) {
                throw new Error(errorMessage.loginMessage.undefinedEmail);
            }
            const valid = await bcrypt.compare(password, user.password)

            if (!valid) {
                throw new Error(errorMessage.loginMessage.wrongPassword);
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );

            return {
                token: token,
                tokenExpiration: 1,
                userId: user.id,
            }

        },

        updateUser: async (_,args, { User }) => {
            const user = await User.findOneAndUpdate(
                {_id: args.id},
                args.profileInput,
                {new: true}
            );
            return user;
        },
    }
}
