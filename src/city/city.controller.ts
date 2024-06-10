import{cityService,getcityService,createcityService,updatecityService,deletecityService} from "./city.service";
import { Context } from "hono";
export const listcity = async (c: Context) => {
    try {
        //limit the number of state to be returned

        const limit = Number(c.req.query('limit'))

        const data = await cityService(limit);
        if (data == null || data.length == 0) {
            return c.text("city not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getcity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getcityService(id);
    if (user == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(user, 200);
}
export const createcity = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdstate = await createcityService(user);


        if (!createdstate) return c.text("city not created", 404);
        return c.json({ msg: createdstate }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatecity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the city
        const searchedstate = await getcityService(id);
        if (searchedstate == undefined) return c.text("city not found", 404);
        // get the data and update it
        const res = await updatecityService(id, user);
        // return a success message
        if (!res) return c.text("city not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletecity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the city
        const state = await getcityService(id);
        if (state == undefined) return c.text("city not found", 404);
        //deleting the city
        const res = await deletecityService(id);
        if (!res) return c.text("city not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}