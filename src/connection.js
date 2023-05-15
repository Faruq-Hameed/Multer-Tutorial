const MongoClient = require('mongodb').MongoClient
const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 3000

const startServer = async (app) => {
  MongoClient.connect(MONGODB_URL)
    .then(() => {
      console.log("Connected to local database successfully");
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.log("Error connecting to server because: " + err.message);
    });
};

module.exports = startServer
