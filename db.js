var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost:27017/hotels';

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

// Event listener for disconnection
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Event listener for reconnect failure
db.on('reconnectFailed', () => {
  console.log('Reconnection to MongoDB failed');
});

// Event listener for errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Enable Mongoose debugging (optional)
mongoose.set('debug', true);

// Export the connection
module.exports = db;
