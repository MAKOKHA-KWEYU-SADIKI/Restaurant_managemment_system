import{ordermService,getordermService,createordermService,updateordermService,deleteordermService} from "./orderm.service";
import { Context } from "hono";
export const listorderm = async (c: Context) => {
    try {
       

        const limit = Number(c.req.query('limit'))

        const data = await ordermService(limit);
        if (data == null || data.length ==0){
            return c.text("orderm not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorderm = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu = await getordermService(id);
    if (menu == undefined) {
        return c.text("orderm not found", 404);
    }
    return c.json(menu, 200);
}
export const createorderm = async (c: Context) => {
    try {
        const menu = await c.req.json();
        const createdorderm = await createordermService(menu)
        if (!createdorderm) return c.text("orderm not created", 404);
        return c.json({ msg: createdorderm }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorderm = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const orderm = await c.req.json();
    try {
   
        const searchedorderm = await getordermService(id);
        if (searchedorderm == undefined) return c.text("orderm not found", 404);

        const res = await updateordermService(id, orderm);
    
        if (!res) return c.text("orderm not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorderm = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const orderm = await getordermService(id);
        if (orderm == undefined) return c.text("orderm not found", orderm)
        const res = await deleteordermService(id);
        if (!res) return c.text("orderm not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}