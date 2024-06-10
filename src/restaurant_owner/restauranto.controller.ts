import{restaurantoService,getrestaurantoService,createrestaurantoService,updaterestaurantoService,deleterestaurantoService} from "./reustauranto.service";
import { Context } from "hono";
export const listrestauranto = async (c: Context) => {
    try {
       

        const limit = Number(c.req.query('limit'))

        const data = await restaurantoService(limit);
        if (data == null || data.length ==0){
            return c.text("restauranto not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getrestauranto = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu = await getrestaurantoService(id);
    if (menu == undefined) {
        return c.text("restauranto not found", 404);
    }
    return c.json(menu, 200);
}
export const createrestauranto = async (c: Context) => {
    try {
        const menu = await c.req.json();
        const createdorders = await createrestaurantoService(menu)
        if (!createdorders) return c.text("restauranto not created", 404);
        return c.json({ msg: createdorders }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updaterestauranto = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const orders = await c.req.json();
    try {
   
        const searchedorders = await getrestaurantoService(id);
        if (searchedorders == undefined) return c.text("restauranto not found", 404);

        const res = await updaterestaurantoService(id, orders);
    
        if (!res) return c.text("restaurantowner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleterestauranto = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const restauranto = await getrestaurantoService(id);
        if (restauranto == undefined) return c.text("restaurantowner not found", restauranto)
        const res = await deleterestaurantoService(id);
        if (!res) return c.text("restaurantowner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}       