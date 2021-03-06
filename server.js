const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const cors = require('cors')
const path = require('path')
 
const app = express();
 
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*',function(req,res) {
      res.sendFile(path.join(__dirname,'client/build','index.html'))
  })
}

const port = process.env.PORT || 5000
 
app.listen(port, () => {
    console.log(`Working on port ${port}`)
}); 