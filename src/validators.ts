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
    
    street_address_1:z.string(),
    street_address_2:z.string(),
    zip_code:z.string(),
    delivery_instructions:z.string(),
    user_id:z.number(),
    city_id:z.number(),
    city:z.string(),
    users:z.string(),
    orders:z.string()

})
export const userSchema =z.object({
   
    name:z.string(),
    contact_phone:z.string(),
    phone_verified:z.boolean(),
    email:z.string(),
    email_verified:z.string(),
    confirmation_code:z.string(),
    password:z.string(),
    created_at:z.date().optional(),
    updated_at:z.date().optional(),
    address:z.string(),
    comment:z.string(),
    driver:z.string(),
    orders:z.string(),
    restaurant_owner:z.string()
})