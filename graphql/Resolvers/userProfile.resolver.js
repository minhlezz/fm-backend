


module.exports = {

    Query: {
        userProfile: async (parent, args, context, { UserProfile }) => {

            const userProfile = await UserProfile.findOne({ _id: args.id })
            return userProfile;
        },

        allUserProfiles: async ({ UserProfile }) => {
            try {
                const allUserProfiles = await UserProfile.find();
                return allUserProfiles.map(userProfile => {
                    userProfile.id = userProfile.id.toString();
                    return userProfile;
                });
            } catch (error) {
                console.log('Error occured as query to UserProfle');
                throw error

            }
        }
    },

    Mutation: {
        createProfile: async (parent, { profileInput }, { UserProfile, User, authUser }) => {           
            const userProfile = await new UserProfile(profileInput);
            userProfile.id = userProfile.id.toString();
            userProfile.user = authUser.userId;
            const result = await userProfile.save();
            return result;


        },

        updateProfile: async (args, { profileInput }, { UserProfile }) => {
            const userProfile = await UserProfile.findOneAndUpdate(
                { id: args.id },
                args,
                { new: true }
            );
            return userProfile;
        },
    },
    UserProfile: {
        user: async (userProfile, _, { User }) => {
            const user = await User.findById({ _id: userProfile.user });
            return user
        }
    }

}