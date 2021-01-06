const { UserInputError, AuthenticationError, withFilter } = require('apollo-server');


module.exports = {
    //Message Query
    Query: {
        getMessages: async (parent, { sender }, { user, User, Message }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('Unauthenticated');
                }
                const otherUser = await User.findOne({
                    email: sender
                });
                if (!otherUser) throw new UserInputError('User not found');
                const usernames = [user.email, otherUser.email]
                const messages = await Message.find({
                    sender: usernames,
                    receiver: usernames,
                }).sort({
                    createdAt: -1
                })
                return messages;
            } catch (err) {
                console.log(err);
                throw err
            }
        }
    },

    //Message Mutation
    Mutation: {
        sendMessage: async (parent, { receiver, content }, { user, pubsub, Message, User }) => {
            try {
                //Check User is authenticated
                if (!user) {
                    throw new AuthenticationError('Unauthenticated');
                };
                //User exists? && Send to themselves
                const userReceiver = await User.findOne({
                    email: receiver
                });
                if (!userReceiver) {
                    throw new UserInputError('User not found');
                } else if (userReceiver.email === user.email) {

                    throw new UserInputError('Cannot send message to yourself');
                };
                //InValid Empty Message
                if (content.trim() === '') {
                    throw new UserInputError('Message is empty');
                };
                //Create message
                const message = await Message.create({
                    sender: user.email,
                    receiver,
                    content,
                    createdAt: new Date().toISOString()
                });
                pubsub.publish('NEW_MESSAGE', { newMessage: message })

                return message;

            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    //Other Config
    Subscription: {
        newMessage: {
            subscribe: withFilter((_, __, { pubsub, user }) => {
                if (!user) throw new AuthenticationError('Unauthenticated');
                return pubsub.asyncIterator(['NEW_MESSAGE']);
            },
                ({ newMessage }, _, { user }) => {
                    if (
                        newMessage.receiver === user.email ||
                        newMessage.sender === user.email
                    ) {
                        return true
                    }
                    return false
                }
            ),
        },
    }
}