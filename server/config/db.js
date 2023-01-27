const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

module.exports = { mongoURI: uri };