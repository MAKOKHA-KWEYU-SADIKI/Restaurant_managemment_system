import { z } from 'zod'
export const stateSchema = z.object({
    name: z.string(),
    code: z.string(),
    city: z.string(),
   
})
export const citySchema = z.object({
    name: z.string(),
    state_id: z.number(),
    address:z.string(),
    state: z.string(),
    restorand:z.string()
   
})
export const categorySchema=z.object({
    name:z. string(),
    menu_item: z.string()
})

export const status_catalogSchema=z.object({
    name: z.string(),
    order_status: z.string()
})
export const addressSchema=z.object({
    
})