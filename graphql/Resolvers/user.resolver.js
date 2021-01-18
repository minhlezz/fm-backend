const { UserInputError } = require('apollo-server-express');
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
        getUser: async (parent, { id }, { User }) => {
            try {
                const user = await User.findById(id);
                if (user) return user;
                else throw new Error('User not found');
            } catch (err) {
                throw new Error(err);
            }
        },
        users: async (_, args, { user, User, Message }) => {
            try {
                let users = await User.find();
                //Filtering lastedMessage
                const allUserMessages = await Message.find({
                    $or: [
                        { sender: user.email },
                        { receiver: user.email }
                    ]
                }).sort({
                    createdAt: -1
                });
                users = users.map((otherUser) => {
                    const latestMessage = allUserMessages.find((message) =>
                        message.sender === otherUser.email || message.receiver === otherUser.email);
                    otherUser.latestMessage = latestMessage
                    return otherUser;
                })
                return users;
            } catch (err) {
                console.log(err);
                throw err;
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
                    password,
                    createdAt: new Date().toISOString()
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

        updateUser: async (_, { id, profileInput }, { User }) => {
            const user = await User.findOneAndUpdate(
                { _id: id },
                profileInput,
                { new: true }
            );
            return user;
        },
    },
    User: {
        location: async (parent, args, { Location }, infor) => {
            const locationR = await Location.findOne({
                user: parent
            });
            return locationR
        },
        houseHold: async (parent, __,{ HouseHold }) => {
            const houseHoldOwner = await HouseHold.findOne({
                owner: parent
            })
            return houseHoldOwner;
        }
    }
}
