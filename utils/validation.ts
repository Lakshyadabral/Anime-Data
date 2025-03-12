import Joi from 'joi';

export const animeSchema = Joi.object({
  anime_name: Joi.string().min(1).required(),
  protagonist: Joi.string().min(1).optional(),
  antagonist: Joi.string().min(1).optional(),
  imdb_rating: Joi.number().min(0).max(10).optional(),
  genres: Joi.array().items(Joi.string().min(1)).optional(),
  details: Joi.object({
    episodes: Joi.number().integer().positive().optional(),
    release_year: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
    studio: Joi.string().min(1).optional(),
  }).optional(),
});
