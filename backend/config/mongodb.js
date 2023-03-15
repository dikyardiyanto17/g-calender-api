const mongoose = require('mongoose');

const uri = "mongodb+srv://dikyardiyanto:102117014@challenge2phase3.cl2pgfn.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
}

connect();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected');
});

module.exports = {db, connect};
