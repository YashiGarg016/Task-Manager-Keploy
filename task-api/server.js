const { app, connectDB } = require('./index');

const MONGO_URI = 'mongodb://localhost:27017/tasksDB';

connectDB(MONGO_URI)
  .then(() => {
    app.listen(3000, '0.0.0.0', () => {
      console.log('🌍 Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });