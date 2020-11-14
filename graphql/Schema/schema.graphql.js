const { gql } = require('apollo-server');


module.exports = gql`

type AuthData {
  userId: ID
  token: String
  tokenExpiration: Int
}

type User {
    id: String
    email: String
    password: String
    # userProfile: UserProfile
    images: [Picture]
    username: String
    budget: Float
    mobile: String
    mobileVerified: Boolean
    radius: Float
    age: Int
    gender: Gender
}

# type UserProfile {
#     id: String
#     username: String
#     budget: Float
#     mobile: String
#     mobileVerified: Boolean
#     radius: Float
#     age: Int
#     gender: Gender
#     user: User
# }

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

#Input Type
input UserInput {
    email: String!
    password: String!
}


input ProfileInput {
    username: String
    budget: Float
    mobile: String
    radius: Float
    age: Int
    gender: String
    user: String
}

#Query && Mutation
type Query {
    user(id: String!): User
    users: [User!]
    # userProfile(_id: String): UserProfile!
    # allUserProfiles: [UserProfile!]

}


type Mutation {
    login(email: String!, password: String!): AuthData!
    register(input: UserInput): User!
    # createProfile(profileInput: ProfileInput): UserProfile
    # updateProfile(id: String!, profileInput: ProfileInput): UserProfile!
    # deleteProfile(id: String!): UserProfile!
    createPicture(name: String!, pictureUrl: String!): Picture!
    updatePicture(id: String!, name: String!, pictureUrl: String!): Picture!
    deletePicture(id: String): Picture!
    updateUser(id: String!, profileInput: ProfileInput): User!

}

`;

