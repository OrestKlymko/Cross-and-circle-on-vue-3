const URL =
  "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const client = new MongoClient(URL);

function requestMongo(method, name) {
  if (method == "post") {
    const create = async () => {
      try {
        await client.connect();
        const usersColl = client.db("users").collection("users");
        await usersColl.insertOne({ name: name, count: 0 });
      } catch (e) {
        console.log(e);
      }
    };
    create();
  }
}

requestMongo("post", "Ira");

// export default requestMongo;
