import { z } from 'zod'
export const stateSchema = z.object({
    name: z.string(),
    code: z.string(),
    city: z.string(),
   
})
export const citySchema = z.object({
    name: z.string(),
    code: z.string(),
    city: z.string(),
   
})