import { boolean } from 'drizzle-orm/mysql-core'
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
    email_verified:z.boolean(),
    confirmation_code:z.string(),
    password:z.string(),
    address:z.string(),
    comment:z.string(),
    driver:z.string(),
    orders:z.string(),
    restaurant_owner:z.string()
})
export const commentSchema=z.object({
    order_id:z.number(),
    user_id:z.number(),
    comment_text:z.string(),
    is_complaint:z.boolean(),
    is_praise:z.boolean(),
    //created_at:z.date(),
    //updated_at:z.date(),
    orders:z.string(),
    users:z.string()
})
export const driverSchema=z.object({
    
    car_make:z.string(),
    car_model:z.string(),
    car_year:z.number(),
    user_id:z.number(),
    online:z.boolean(),
    delivering:z.boolean(),
    created_at:z.date(),
    updated_at:z.date(),
    users:z.string(),
    oders:z.string()
})
export const menuSchema=z.object({
   
    name:z.string(),
    restaurand_id:z.number(),
    category_id:z.number(),
    description:z.string(),
    ingredient:z.string(),
    price:z.number(),
    active:z.boolean(),
    // created_at:z.date(),
    // update_at:z.date(),
    category:z.string(),
    order_menu_item:z.string()
})
export const ordermSchema=z.object({
    order_id:z.number(),
    menu_item_id:z.number(),
    quantity:z.number(),
    item_price:z.number(),
    price:z.number(),
    comment:z.string(),
    menu_item:z.string(),
    orders:z.string()
})
export const ordersSchema=z.object({
    order_id:z.number(),
    status_catalog_id:z.number(),
    created_at:z.date(),
    orders:z.string(),
    status_catalog:z.string()
})
export const orderSchema=z.object({
    restaurant_id:z.number(),
    estimate_delivery_time:z.date(),
    actuall_delivery_time:z.date(),
    delivery_address_id:z.number(),
    user_id:z.number(),
    driver_id:z.number(),
    price:z.number(),
    discount:z.number(),
    final_price:z.number(),
    comment:z.string(),
    created_at:z.date(),
    updated_at:z.date(),
    comments:z.string(),
    oder_menu_item:z.string(),
    order_status:z.string(),
    driver:z.string(),
    restaurant:z.string(),
    users:z.string()
})
export  const restaurantSchema=z.object({
    name:z.string(),
    street_address:z.string(),
    zip_code:z.string(),
    city_id:z.number(),
    created_at:z.string(),
    updated_at:z.string(),
    menu_item:z.string(),
    orders:z.string(),
    city:z.string(),
    restaurand_owner:z.string()
})
export const restaurantoSchema=z.object({
    restaurant_id:z.number(),
    owner_id:z.number(),
    users_id:z.string(),
    restaurant:z.string()
})
export const loginUserSchema=z.object({
    username:z.string(),
    password:z.string()
})
export const registerUserSchema=z.object({
    user_id:z.number(),
    username:z.string(),
    password:z.string(),
    role:z.string().optional()
})