import { MongoClient } from "mongodb";

// Use environment variables OR hardcoded URI
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://lakshyadabral24554:Vegito@cluster0.zprtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(MONGO_URI);

try {
  await client.connect();
  console.log(" Connected to MongoDB Atlas");
} catch (error) {
  console.error(" Failed to connect to MongoDB:", error);
  process.exit(1);
}

export const db = client.db("animeDB"); 
export const animeCollection = db.collection("anime"); 
