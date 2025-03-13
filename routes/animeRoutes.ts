import { Hono } from 'hono';
import type { Context } from 'hono';
import { validateRequest } from '../middlewares/validateRequest';
import { animeSchema } from '../utils/validation';
import {
  getAllAnimes,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,

} from '../controllers/animeController';

const animeRoutes = new Hono();

// Get all animes
animeRoutes.get('/', async (c) => {
    try {
      const animes = await getAllAnimes();
      return c.json(animes);
    } catch (error) {
      return c.json({ error: 'Failed to fetch animes' }, 500);
    }
  });

// Get a single anime by ID
animeRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const anime = await getAnimeById(id);
    if (!anime) return c.json({ error: 'Anime not found' }, 404);

    return c.json(anime);
  } catch (error) {
    return c.json({ error: 'Failed to fetch the anime' }, 500);
  }
});

// Create a new anime
animeRoutes.post('/', validateRequest(animeSchema), async (c: Context & { validatedBody?: any }) => {
  try {
    const validatedBody = c.validatedBody; // Access the validated body
    const anime = await createAnime(validatedBody);
    return c.json(anime, 201); // Return the created anime
  } catch (error) {
    return c.json({ error: 'Failed to create anime' }, 500);
  }
});


// Update an anime
animeRoutes.patch("/:id", validateRequest(animeSchema), async (c: Context & { validatedBody?: any }) => {
  try {
    const id = c.req.param("id");
    const validatedBody = c.validatedBody;
    const updatedAnime = await updateAnime(id, validatedBody);

    if (!updatedAnime) {
      return c.json({ error: "Anime not found" }, 404);
    }

    return c.json(updatedAnime); 
  } catch (error) {
    return c.json({ error: "Failed to update anime" }, 500);
  }
});

// Delete an anime
animeRoutes.delete('/:id', async (c: Context) => {
  try {
    const id = c.req.param('id'); // Get the ID from the URL

    const success = await deleteAnime(id);

    if (!success) {
      return c.json({ error: 'Anime not found' }, 404); // If no document was deleted
    }

    return c.json({ message: 'Anime deleted successfully' }); // Success response
  } catch (error) {
    return c.json({ error: 'Failed to delete anime' }, 500); // Server error
  }
});
export default animeRoutes;
