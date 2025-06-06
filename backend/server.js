const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware
// Enable CORS for all routes
app.use(cors({
    origin: ['https://mart4u-wv3y.vercel.app/', 'https://mart4admin.vercel.app/', 'https://mart4u.vercel.app'], 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Allow credentials (like cookies) to be sent
}));

app.use(express.json()); // Parses incoming JSON

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.use('/', res => {
    res.send('crudMERN Server is running!')
  });
}

main().then(() => console.log("Mongodb connected successfully!")).catch(err => console.log(err));

// Mongoose Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', UserSchema);

// Routes

// Read all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a new user
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Update a user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
})



