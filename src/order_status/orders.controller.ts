import{ordersService,getordersService,createordersService,updateordersService,deleteordersService} from "./orders.sevice";
import { Context } from "hono";
export const listorders = async (c: Context) => {
    try {
       

        const limit = Number(c.req.query('limit'))

        const data = await ordersService(limit);
        if (data == null || data.length ==0){
            return c.text("orders not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu = await getordersService(id);
    if (menu == undefined) {
        return c.text("orders not found", 404);
    }
    return c.json(menu, 200);
}
export const createorders = async (c: Context) => {
    try {
        const menu = await c.req.json();
        const createdorders = await createordersService(menu)
        if (!createdorders) return c.text("orders not created", 404);
        return c.json({ msg: createdorders }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const orders = await c.req.json();
    try {
   
        const searchedorders = await getordersService(id);
        if (searchedorders == undefined) return c.text("orders not found", 404);

        const res = await updateordersService(id, orders);
    
        if (!res) return c.text("orders not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorders = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const orders = await getordersService(id);
        if (orders == undefined) return c.text("orders not found", orders)
        const res = await deleteordersService(id);
        if (!res) return c.text("orders not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}