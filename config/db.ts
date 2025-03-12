import { MongoClient } from 'mongodb';


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

try {
  await client.connect(); // Connect to MongoDB
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit the process if the connection fails
}

export const db = client.db('AnimeData'); // Use the AnimeData database
export const animeCollection = db.collection('AnimeData'); 