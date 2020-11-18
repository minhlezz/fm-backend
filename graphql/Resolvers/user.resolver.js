const { AuthenticationError, UserInputError } = require('apollo-server-express');
const errorMessage = require('../../errorMessage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');
const {
    validateRegisterInput,
    validateLoginInput
} = require('../../utils/validator');


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
        register: async (parent, { input: {
            email, password, confirmPassword
        } }, { User }) => {
            try {
                const { valid, errors } = validateRegisterInput(
                    email,
                    password,
                    confirmPassword
                );
                //Check user input
                if (!valid) {
                    throw new UserInputError('ErrorInput', { errors });
                }

                //check user is existing
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new UserInputError(errorMessage.register.existingUser, {
                        errors: {
                            email: errorMessage.register.existingUser
                        }
                    });
                }
                password = await bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    password
                });
                const result = await newUser.save();

                return {
                    ...result._doc,
                    id: result.id,
                };
            } catch (error) {
                console.log('error in register progress!!');
                throw error
            }
        },

        login: async (_, { email, password }, { User }) => {
            const { errors, valid } = validateLoginInput(email, password);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email });
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError(errorMessage.loginMessage.undefinedEmail, { errors });
            }
            const match = await bcrypt.compare(password, user.password)

            if (!match) {
                errors.general = 'Incorrect Password';
                throw new UserInputError(errorMessage.loginMessage.wrongPassword,
                    { errors });
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
                ...user._doc,
                userId: user.id,
                token: token,
                tokenExpiration: 1,
            }

        },

        updateUser: async (_, args, { User }) => {
            const user = await User.findOneAndUpdate(
                { _id: args.id },
                args.profileInput,
                { new: true }
            );
            return user;
        },
    }
}
