import { Hono } from 'hono';
import { serve } from 'bun';
import animeRoutes from './routes/animeRoutes';
import { cors } from "hono/cors";


const app = new Hono();


app.use(
  cors({
    origin: "*", // Allow all origins (or specify only frontend URL)
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type"],
  })
);

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
