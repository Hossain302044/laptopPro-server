const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express());




const uri = "mongodb+srv://dbwarehouseservice:ksAHpzIJ2fRpgOfQ@cluster0.clm4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('db connect');
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('warehouse management server');
})

app.listen(port, () => {
    console.log('Server Running Port', port);
})
