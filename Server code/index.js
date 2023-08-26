const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.PAYMENT_KEY)
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const verifyJWT= (req,res, next) =>{
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).send({ error: true, message: 'unauthorized access'});
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
    if(err){
      return res.status(401).send({error: true, message: 'unauthorized access'})
    }
    req.decoded = decoded;
    next();
  })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u7azzsr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usersCol = client.db("bistroDb").collection("users")
    const menuCol = client.db("bistroDb").collection("menu")
    const CartCol = client.db("bistroDb").collection("cart")
    const paymentCol = client.db("bistroDb").collection("payments")
    const testCol = client.db("bistroDb").collection("test")
    
    app.post('/jwt', (req,res)=>{
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.send({token})
    })

    const verifyAdmin = async(req, res, next) => {
      const email = req.decoded.email;
      const query = {email: email}
      const user = await usersCol.findOne(query);
      if(user?.role !== 'admin'){
        return res.status(403).send({error: true, message: 'forbidden message'});
      }
      next();
    }
    
    app.post('/test', async(req, res)=> {
      const test = req.body;
      const result = await testCol.insertOne(test);
      res.send(result)

    })

    app.get('/users', verifyJWT, verifyAdmin, async(req,res)=>{
      const result = await usersCol.find().toArray();
      res.send(result);
  })


    app.post('/users', async(req,res)=>{
      const user = req.body;
      console.log(user);
      const query = {email: user.email}
      const existingUser = await usersCol.findOne(query)
      console.log(existingUser)
      if(existingUser){
        return res.send({message: 'user exists'})
      }
      const result = await usersCol.insertOne(user);
      res.send(result);
    })
    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {_id: new ObjectId(id)}
      const result = await usersCol.deleteOne(query);
      res.send(result);
    })

    app.get('/users/admin/:email', verifyJWT, async(req,res)=>{
      const email = req.params.email;

      if(req.decoded.email !==email){
        res.send({ admin: false })
      }
      const query= { email: email}
      const user = await usersCol.findOne(query);
      const result = {admin: user?.role==='admin'}
      res.send(result)
    })

    app.patch('/users/admin/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updateDoc={
        $set: {
          role: 'admin'
        },
      };
      const result = await usersCol.updateOne(filter, updateDoc);
      res.send(result)
    })
    app.get('/menu', async(req,res)=>{
        const result = await menuCol.find().toArray();
        res.send(result);
    })
    app.post('/menu', verifyJWT, verifyAdmin, async(req,res)=>{
      const newItem = req.body;
      console.log(newItem)
      const result = await menuCol.insertOne(newItem);
      res.send(result);
  })

  app.delete('/menu/:id', verifyJWT, verifyAdmin, async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await menuCol.deleteOne(query);
    res.send(result);
})

    app.get('/carts', verifyJWT, async(req,res)=>{
      const email = req.query.email;
      if(!email){
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if(email !== decodedEmail){
       return res.status(403).send({error: true, message: 'forbiden access'})
      }
      const query = {email: email};
      const result = await CartCol.find(query).toArray();
      res.send(result);
    })

    app.post('/carts', async(req,res)=>{
      const item = req.body;
      console.log(item)
      const result = await CartCol.insertOne(item);
      res.send(result);
  })

  app.delete('/carts/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await CartCol.deleteOne(query);
    res.send(result);
})

app.post('/create-payment-intent', verifyJWT, async(req, res)=>{
  const {price} = req.body;
  const amount = price * 100;
  console.log(price, amount)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card']

  });
  res.send({
    clientSecret: paymentIntent.client_secret
  })
})

app.post('/payments', async(req, res) => {
  const payment = req.body;
  const result = await paymentCol.insertOne(payment);
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('boss is rulling')
})



app.listen(port, ()=>{
    console.log(`Bistro rulling on ${port}`)
})