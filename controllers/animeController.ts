import { ObjectId } from 'mongodb';
import { animeCollection } from '../config/db';

// Fetch all anime
export const getAllAnimes = async () => {
    const animes = await animeCollection.find().toArray();
    return animes;

};


// Get a single anime by ID

export const getAnimeById = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  const anime = await animeCollection.findOne({ _id: new ObjectId(id) });
  if (!anime) {
    throw new Error('Anime not found');
  }
  return anime;
};

// Create a new anime
export const createAnime = async (anime: any) => {
  const result = await animeCollection.insertOne(anime);
  const insertedAnime = await animeCollection.findOne({ _id: result.insertedId });
  return insertedAnime;
};


// Update an anime
export const updateAnime = async (id: string, anime: any) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  const result = await animeCollection.findOneAndUpdate(
    { _id: new ObjectId(id) }, 
    { $set: anime },
    { returnDocument: "after" }
    
  );

  return result;
};


// Delete an anime
export const deleteAnime = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  const result = await animeCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    throw new Error('Anime not found');
  }

  return true;
};