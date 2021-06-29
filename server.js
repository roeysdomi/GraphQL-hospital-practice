const express = require('express')
const mongoose = require('mongoose');
const db = require('./config/key').mongoURI;
const expressGraphQL = require('express-graphql')
const monfunction = require('./monfunction');

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
const {
  ProfileTypeInput,
  UserTypeInput,
  HospitalTypeInput,
  ProfileType,
  UserType,
  HospitalType
}=require('./Types')
const app = express()
//-------------database----------------------

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => {console.log('MongoDB Connected')})
  .catch(err => console.log(err));
  mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
////--------------------------

// ------------------------------------------------

// ------------------query----------------------------

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    allHospitalsForUserQuery: {
      type: new GraphQLList(HospitalType),
      description: 'A list of hospitals',
      args: {
          userId:{ type: GraphQLNonNull(GraphQLID)},
      },
      resolve: (parent, args) =>
      {
        try
        {
            return monfunction.returnrole(args.userId)
        }
        catch(err){
               return err
        }
      }

    }
  })
})
// -------------------------mutation-----------------------------
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createHospitalMutation: {
      type: HospitalType,
      description: 'create hospital',
      args: {
        hospital: { type: GraphQLNonNull(HospitalTypeInput) },
      },
      resolve: (parent, args) => {
          try
          {
              return monfunction.enterhospital(args.hospital)
          }
          catch(err){
                 return err
          }
      }
    },
    createUserMutation: {
      type: UserType,
      description: 'create user',
      args: {
        User: { type: GraphQLNonNull(UserTypeInput) },
      },
      resolve: (parent, args) => {
        try{
          const s=  monfunction.enteruser(args.User);
          return s;
        }catch(err){

             return err
        }

      }
    },
    updateHospitalMutation: {
      type: HospitalType,
      description: 'update hospital',
      args: {
        hospitalId: { type: GraphQLNonNull(GraphQLID) },
        updatedHospital:{ type: HospitalTypeInput },
      },
      resolve: (parent, args) => {
        try
        {
            return monfunction.updatehospital(args.hospitalId,args.updatedHospital)
        }
        catch(err){
               return err
        }
      }
    },
    updateUserMutation: {
      type: UserType,
      description: 'update USER',
      args: {
        userId : { type: GraphQLNonNull(GraphQLID) },
        updatedUser:{ type: GraphQLNonNull(UserTypeInput) },
      },
      resolve: (parent, args) => {
        try
        {
            return monfunction.updateuser(args.userId,args.updatedUser)
        }
        catch(err){
               return err
        }
      }
    },
    loginWithPermissionsMutation: {
      type: UserType,
      description: 'login with premisson',
      args: {
        userId : { type: GraphQLNonNull(GraphQLID) },

      },
      resolve: (parent, args) => {
        try
        {
            return monfunction.updatelogin(args.userId)
        }
        catch(err){
              console.log("THERE ISS ERROR");
               return err
        }
      }
    },


  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))
