const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());



const mongoURI = 'mongodb+srv://adarshsingh:mypassword1234@cluster0.wsagmda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB:', err));



const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});



app.post('/api/contact', async (req, res) => {
  try {
    // Create a new contact instance with data from the request body
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    // Save the new contact to the database
    await newContact.save();
    
    // Send a success response
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Server error. Please try again later.', error: error });
  }
});







app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
