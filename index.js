const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var admin = require('firebase-admin');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dsrmo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true} );

 




const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000




client.connect(err => {
  const order = client.db("ema-john-db").collection("orders");
  // perform actions on the collection object
  app.post('/addProduct', (req, res) => {
      const products= req.body
      order.insertMany(products)
      .then((result) =>{
            console.log(result.insertedCount)
            res.send(result.insertedCount)
      })
    // console.log(product)
      
  })

  app.get ('/products', (req, res) =>{
      order.find({})
      .toArray((err, documents)=>{
          res.send(documents)
      })
  })

  app.get ('/product/:key', (req, res) =>{
    order.find({key: req.params.key})
    .toArray((err, documents)=>{
        res.send(documents[0])
    })
})
//   console.log(process.env.DB_NAME)
  console.log("database connected")
//   client.close();
});


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port)