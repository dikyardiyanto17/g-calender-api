const mongoose = require('mongoose');

const uri = "mongodb+srv://dikyardiyanto:102117014@challenge2phase3.cl2pgfn.mongodb.net/challenge2phase3?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
}


module.exports = connect
