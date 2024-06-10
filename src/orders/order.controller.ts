import{orderService,getorderService,createorderService,updateorderService,deleteorderService} from "./order.service";
import { Context } from "hono";
export const listorder = async (c: Context) => {
    try {
       

        const limit = Number(c.req.query('limit'))

        const data = await orderService(limit);
        if (data == null || data.length ==0){
            return c.text("order not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu = await getorderService(id);
    if (menu == undefined) {
        return c.text("order not found", 404);
    }
    return c.json(menu, 200);
}
export const createorder = async (c: Context) => {
    try {
        const menu = await c.req.json();
        const createdorder = await createorderService(menu)
        if (!createdorder) return c.text("order not created", 404);
        return c.json({ msg: createdorder }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const orders = await c.req.json();
    try {
   
        const searchedorders = await getorderService(id);
        if (searchedorders == undefined) return c.text("order not found", 404);

        const res = await updateorderService(id, orders);
    
        if (!res) return c.text("order not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const orders = await getorderService(id);
        if (orders == undefined) return c.text("order not found", orders)
        const res = await deleteorderService(id);
        if (!res) return c.text("order not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}