import type { Context, Next } from 'hono';
import Joi from 'joi';


export const validateRequest = (schema: Joi.ObjectSchema) => {
  return async (c: Context & { validatedBody?: any }, next: Next) => {
    try {
      const body = await c.req.json(); 
      const { error, value } = schema.validate(body, { abortEarly: false });

      if (error) {
        return c.json({ error: error.details.map((e) => e.message) }, 400);
      }

      c.validatedBody = value; 
      await next();
    } catch {
      return c.json({ error: 'Invalid request payload' }, 400);
    }
  };
};
