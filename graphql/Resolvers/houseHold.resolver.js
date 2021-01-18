const { UserInputError, AuthenticationError } = require("apollo-server");



module.exports = {

    //Query 
    Query: {
        getHouseHold: async (_, { id }, { HouseHold }) => {
            try {
                const houseHold = await HouseHold.findById({
                    _id: id.toString(),
                });
                if (houseHold) {
                    return houseHold;
                } else {
                    throw new UserInputError('da house not found !!');
                };
            } catch (err) {
                console.log(err);
                throw err;
            }
        },

        getHouseHolds: async (_, __, { HouseHold, user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('Unauthenticated');
                }
                const houseHolds = await HouseHold.find();
                return houseHolds;

            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },

    //Mutation

    Mutation: {
        createHouseHold: async (parent, { id, houseHoldInput }, { user, HouseHold }) => {
            try {
                //Validate 1 HH- 1User
                if (!user) {
                    throw AuthenticationError('Unauthenticated !!');
                }

                // const existingHouseHold = await HouseHold.findOne({
                //     owner: user.userId,
                // });
                // if (existingHouseHold) {
                //     throw new UserInputError('da house iz existing,..');
                // };
                const newHouseHold = new HouseHold(houseHoldInput);
                newHouseHold.owner = user.userId;
                newHouseHold.createdAt = new Date().toISOString();
                newHouseHold.id = newHouseHold.id.toString();
                const houseHold = await newHouseHold.save();
                return houseHold;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        updateHouseHold: async (_, { id, houseHoldInput }, { HouseHold }) => {
            const houseHold = await HouseHold.findOneAndUpdate(
                { _id: id },
                houseHoldInput,
                { new: true }
            );
            return houseHold;
        }
    },

    //Subscription


    //Other Config
    HouseHold: {
        owner: async (parent, __, { User }) => {
            const userOwner = await User.findById({
                _id: parent.owner
            });
            return userOwner;
        }
    }
}
