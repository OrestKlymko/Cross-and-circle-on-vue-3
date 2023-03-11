const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

// оголошення моделі MongoDB
const ItemSchema = new mongoose.Schema({
  name: String,
  count: Number,
});
const ItemModel = mongoose.model("Item", ItemSchema);

// створення сервера Koa
const app = new Koa();
const router = new Router();

// додавання bodyparser для обробки POST-запитів
app.use(bodyParser());

router.get("/usersList", async (ctx) => {
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/users"
  );
  const db = client.db("users");
  const collection = db.collection("users");
  const readyViem = await collection.find().toArray();
  await client.close();
  ctx.body = readyViem;
});
router.post("/users", async (ctx, next) => {
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/users"
  );
  const db = client.db("users");
  const item = new ItemModel(ctx.request.body);
  await db.collection("users").insertOne(item);
  await client.close();
});

router.patch("/usersRework/:id", async (ctx, next) => {
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/users"
  );
  const db = client.db("users");
  const collection = db.collection("users");
  const id = ctx.params.id;
  const item = ctx.request.body;

  const filter = { _id: ObjectId.createFromHexString(id) };
  const options = { upsert: true };
  const update = { $set: { ...item } };

  await collection.findOneAndUpdate(filter, update, options);

  ctx.status = 204;

  client.close();
});

app.use(router.routes());
app.listen(2000, () => {
  console.log("Server running on port 2000");
});
