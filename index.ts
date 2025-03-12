import { Hono } from 'hono';
import { serve } from 'bun';
import animeRoutes from './routes/animeRoutes';


const app = new Hono();




// Register routes
app.route('/animes', animeRoutes);


// Root route for testing
app.get('/', async (c) => {
  return c.json({ message: 'Welcome to the Anime API!' });
});

serve({
  fetch: app.fetch, 
  port: 3000,       
});

console.log('Server is running on local host 3000');
