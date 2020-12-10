const { gql } = require('apollo-server');


module.exports = gql`

type AuthData {
  userId: ID
  token: String
  tokenExpiration: Int
}

type User {
    id: ID
    email: String
    password: String
    # userProfile: UserProfile
    images: [Picture]
    username: String
    budget: Float
    mobile: String
    mobileVerified: Boolean
    age: Int
    gender: Gender
    aboutMe: String
    moveInDate: String
    minStay: String
    headline: String
    description: String
    cleanliness: String
    overnightGuests: String
    partyHabits: String
    getUp: String
    goToBed: String
    foodReference: String
    smoker: String
    workSchedule: String
    occupation: String
    pet: String
    location: Location
}


enum Gender {
    Male
    Female
    Others
}

type Picture {
    id: String
    pictureUrl: String
    name: String
    user: User
}

type Location {
    id: ID
    latitude: Float
    longitude: Float
    bound: Int
    user: User
}
#Input Type
input UserInput {
    email: String!
    password: String!
    confirmPassword: String!
}


input ProfileInput {
    username: String
    budget: Float
    mobile: String
    age: Int
    gender: String
    aboutMe: String
    moveInDate: String
    minStay: String
    headline: String
    description: String
    cleanliness: String
    overnightGuests: String
    partyHabits: String
    getUp: String
    goToBed: String 
    foodReference: String
    smoker: String
    workSchedule: String
    occupation: String
    pet: String
}

input LocationInput {
    latitude: Float
    longitude: Float
    bound: Int
}
#Query && Mutation
type Query {
    getUser(id: ID!): User
    users: [User!]
    getLocation(id: ID!): Location
    allLocations: [Location!]


}


type Mutation {
    login(email: String!, password: String!): AuthData!
    register(input: UserInput): User!
    updateUser(id: ID!, profileInput: ProfileInput): User!
    createLocation(locationInput: LocationInput): Location
    updateLocation (id: ID!,locationInput: LocationInput): Location
    createPicture(name: String!, pictureUrl: String!): Picture!
    updatePicture(id: String!, name: String!, pictureUrl: String!): Picture!
    deletePicture(id: String): Picture!

}

`;

