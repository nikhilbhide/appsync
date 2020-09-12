const graphql = require('graphql');
var _ = require('lodash');

users = [{id:'1', name:"abc", age:3, profession:"it engineer"},
              {id:'2', name:"xyz", age:23, profession:"doctor"},
              {id:'3', name:"klas", age:75, profession:"mechanic"},
              {id:'4', name:"sfc", age:10, profession:"teacher"}]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

//create type
const UserType = new GraphQLObjectType({
    name:'User',
    description: 'This is schema for user type',
    fields:() => ({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        profession:{type:GraphQLString}
    })
})

//Root query
const RootQuery = new GraphQLObjectType({
    name : 'RootQuerySchema',
    description:'Root query schema for querying',
    fields: {
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args) {
                //resolve with data
                
                return _.find(users,{id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})
