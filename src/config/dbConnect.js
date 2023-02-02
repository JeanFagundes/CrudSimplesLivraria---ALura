import mongoose from "mongoose";

//comando para tirar o warning de depreciação
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://Alura:123@Alura-node.kfk7emh.mongodb.net/Alura-node"
);

const db = mongoose.connection;

export default db;
