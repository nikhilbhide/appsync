const express = require('express')
const app = express()
const graphglHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')

app.use('/graphql',graphglHTTP({
    graphiql:true,
    schema:schema
}))

app.listen(4000,()=>{
    console.log('Listening for serving requests');
})