import{restaurantService,getrestaurantService,createrestaurantService,updaterestaurantService,deleterestaurantService} from "./restaurant.service";
import { Context } from "hono";
export const listrestaurant = async (c: Context) => {
    try {
       

        const limit = Number(c.req.query('limit'))

        const data = await restaurantService(limit);
        if (data == null || data.length ==0){
            return c.text("restaurant not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getrestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu = await getrestaurantService(id);
    if (menu == undefined) {
        return c.text("restaurant not found", 404);
    }
    return c.json(menu, 200);
}
export const createrestaurant = async (c: Context) => {
    try {
        const menu = await c.req.json();
        const createdorders = await createrestaurantService(menu)
        if (!createdorders) return c.text("restaurant not created", 404);
        return c.json({ msg: createdorders }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updaterestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const orders = await c.req.json();
    try {
   
        const searchedorders = await getrestaurantService(id);
        if (searchedorders == undefined) return c.text("restaurant not found", 404);

        const res = await updaterestaurantService(id, orders);
    
        if (!res) return c.text("restaurant not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleterestaurant = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const orders = await getrestaurantService(id);
        if (orders == undefined) return c.text("restaurant not found", orders)
        const res = await deleterestaurantService(id);
        if (!res) return c.text("restaurant not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}       