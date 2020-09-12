const graphql = require('graphql');
var _ = require('lodash');

users = [{id:'1', name:"abc", age:3, profession:"it engineer"},
              {id:'2', name:"xyz", age:23, profession:"doctor"},
              {id:'3', name:"klas", age:75, profession:"mechanic"},
              {id:'4', name:"sfc", age:10, profession:"teacher"}]

hobbies = [{id:'1', title:"swimming", area:"sports", description:"doing swimming"},
{id:'2', title:"table tennis", area:"sports", description:"playing table tennis"},
{id:'3', title:"playing guitar", area:"music", description:"playing instrument such as guitar"},
{id:'4', title:"singing", area:"music", description:"singing with a gifted voice"}]

posts = [{id:'1', comment:"This is not so good TV", userId:'4'},
        {id:'2', comment:"I am feeling so cool", userId:'3'},
        {id:'3', comment:"This is delicate and hence fragile", userId:'2'},
        {id:'4', comment:"I love my country", userId:'1'}]

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

//create type
const HobbyType = new GraphQLObjectType({
    name:'hobby',
    description: 'This is schema for hobby type',
    fields:() => ({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        area:{type:GraphQLString},
        description:{type:GraphQLString},
        profession:{type:GraphQLString}
    })
})

//create post type
const PostType = new GraphQLObjectType({
    name:'Post',
    description: 'This is schema for post type',
    fields:() => ({
        id:{type:GraphQLString},
        comment:{type:GraphQLString},
        user: {
            type:UserType, 
            resolve(parent,args) {
                return _.find(users,{id:parent.userId})
            }
        }
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
        },
        hobby:{
            type:HobbyType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args) {
                //resolve with data              
                return _.find(hobbies,{id:args.id })              
            }
        },
        post:{
            type:PostType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //resolve with data
                return _.find(posts,{id:args.id })                            
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})
