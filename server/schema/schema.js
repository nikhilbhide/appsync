const graphql = require('graphql');

dummy_data = [{id:"1", name:"abc", age:3},
              {id:"2", name:"xyz", age:23},
              {id:"3", name:"klas", age:75},
              {id:"4", name:"sfc", age:10}]

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
        age:{type:GraphQLInt}
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
                let user = {
                    id : "100",
                    name: "nik",
                    age:30
                }
                return user
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})
