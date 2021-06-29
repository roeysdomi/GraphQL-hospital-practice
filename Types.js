const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
} = require('graphql')
/////---------------------------------inputobject--------------------------------
const ProfileTypeInput = new GraphQLInputObjectType({
    name: 'Profileinput',
    fields: {
        firstName:{ type: GraphQLNonNull(GraphQLString)},
        lastName:{ type: GraphQLNonNull(GraphQLString)},
        email:{ type: GraphQLNonNull(GraphQLString)},
        phone:{ type: GraphQLNonNull(GraphQLString)},
    }
});
const UserTypeInput = new GraphQLInputObjectType({
    name: 'Userinput',
    fields: {
      profile:
      {
        type: GraphQLNonNull(ProfileTypeInput)
      },
      password:{type: GraphQLNonNull(GraphQLString)},
      role:{ type: GraphQLNonNull(GraphQLString)},
      lastLoginAt:{ type: GraphQLNonNull(GraphQLString)},
    }
});
const HospitalTypeInput = new GraphQLInputObjectType({
  name: 'HospitalInput',
  fields: {
    name:{ type: GraphQLNonNull(GraphQLString)},
    address:{ type: GraphQLNonNull(GraphQLString)},
    state:{ type: GraphQLNonNull(GraphQLString)},
    managersIds:{ type: GraphQLNonNull(GraphQLID)},
    email:{ type: GraphQLNonNull(GraphQLString)},
  }
})
/////---------------------------object------------------------
const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'This is profile',
  fields: () => ({

      firstName:{ type: GraphQLNonNull(GraphQLString)},
      lastName:{ type: GraphQLNonNull(GraphQLString)},
      email:{ type: GraphQLNonNull(GraphQLString)},
      phone:{ type: GraphQLNonNull(GraphQLString)},
  })
})
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This is user',
  fields: () => ({
    profile:
    {
      type: GraphQLNonNull(ProfileType)
    },
      password:{type: GraphQLNonNull(GraphQLString)},
    role:{ type: GraphQLNonNull(GraphQLString)},
    lastLoginAt:{ type: GraphQLNonNull(GraphQLString)},
  })
})
const HospitalType = new GraphQLObjectType({
  name: 'Hospital',
  description: 'This is hospital',
  fields: () => ({
      name:{ type: GraphQLNonNull(GraphQLString)},
      address:{ type: GraphQLNonNull(GraphQLString)},
      state:{ type: GraphQLNonNull(GraphQLString)},
      managersIds:{ type: GraphQLNonNull(GraphQLID)},
      email:{ type: GraphQLNonNull(GraphQLString)},
  })
})
module.exports=
{
  ProfileTypeInput:ProfileTypeInput,
  UserTypeInput:UserTypeInput,
  HospitalTypeInput:HospitalTypeInput,
  ProfileType:ProfileType,
  UserType:UserType,
  HospitalType:HospitalType
}
