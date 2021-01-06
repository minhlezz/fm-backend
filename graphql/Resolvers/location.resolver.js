const errorMessage = require('../../errorMessage');
const { UserInputError, AuthenticationError } = require('apollo-server-express');


module.exports = {
    Query: {
        getLocation: async (parent, { id }, { Location }) => {
            try {
                const location = await Location.findById(id);
                if (location) return location;
                else throw new Error('Location not found');
            } catch (err) {
                throw new Error(err);
            }
        },
        allLocations: async (parent, args, { Location }) => {
            const locations = await Location.find();
            return locations
        }
    },

    Mutation: {
        createLocation: async (parent, { locationInput }, { Location, user }) => {
            //Check Authentication
            if (!user) {
                throw new AuthenticationError(errorMessage.auth.unAuth);
            }
            const lat = locationInput.latitude;
            const long = locationInput.longitude;
            console.log(lat, long);
            const userId = user.userId;
            //Check location point existed by [lat,long]
            const oneUser = await Location.findById({user: userId }).populate('user')
            .exec(function(err){
                if(err) return console.log(err);
            })
            const existingLocation = await Location.findOne(
                { latitude: lat },
                { longitude: long },
            );
            if (existingLocation || oneUser) {
                console.log('existing');
                throw new UserInputError(errorMessage.location.locationExisting, {
                    errors: {
                        latitude: errorMessage.location.locationExisting,
                        longitude: errorMessage.location.locationExisting
                    }
                });
            }
            //Create new location    
            const newLocation = await new Location(locationInput);
            /** convert ID
             set Relation  to User  */
            newLocation.user = user.userId;
            const location = await newLocation.save();
            return location

        },
        updateLocation: async (_, { id, locationInput }, { Location }) => {
            const location = await Location.findOneAndUpdate(
                { _id: id },
                locationInput,
                { new: true }
            );
            return location;
        },
    },
    Location: {
        user: async ({ user }, _, { User }) => {
            const userR = await User.findById({
                _id: user
            });
            return userR
        }
    }

}