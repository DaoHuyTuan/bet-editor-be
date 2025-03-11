import { z } from 'zod'

/*
 POST /createMovie validate
*/
export const CreateMovieSchema = z
  .object({
    id: z.string().uuid(),
    name: z
      .string({ required_error: 'Field "name" is required' })
      .min(1, { message: 'Field "name" cannot be empty' }),
    value: z
      .string({ required_error: 'Field "value" is required' })
      .min(1, { message: 'Field "value" cannot be empty' }),
    image: z
      .string()
      .url({ message: 'Field "image" must be a valid URL' })
      .optional(),
    description: z.string().optional()
  })
  .omit({
    id: true
  })
/*
  POST /createActress validate
*/

export const CreateActressSchema = z
  .object({
    id: z.string().uuid(),
    name: z
      .string({ required_error: 'Field "name" is required' })
      .min(1, { message: 'Field "name" cannot be empty' }),
    value: z
      .string({ required_error: 'Field "value" is required' })
      .min(1, { message: 'Field "value" cannot be empty' })
    // image: z
    //   .string()
    //   .url({ message: 'Field "image" must be a valid URL' })
    //   .optional(),
    // description: z.string().optional()
  })
  .omit({
    id: true
  })
