const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.clm4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('ProductManagement').collection('products');

        app.get('/allproducts', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const allProduts = await cursor.toArray();
            res.send(allProduts);
        })
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const produts = await cursor.limit(6).toArray();
            res.send(produts);
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.send(product);
        })

        app.get('/myproducts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = productsCollection.find(query);
            const myProducts = await cursor.toArray();
            res.send(myProducts);
        });

        //post
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await productsCollection.insertOne(newProduct);
            res.send(result);
        })


        //update 
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updateProducts = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const Product = {
                $set: {
                    quantity: updateProducts.quantity
                }
            }
            const result = await productsCollection.updateOne(filter, Product, options);
            res.send(result);
        })

        //delete

        app.delete('/allproducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('warehouse management server');
});

app.listen(port, () => {
    console.log('Server Running Port', port);
});
