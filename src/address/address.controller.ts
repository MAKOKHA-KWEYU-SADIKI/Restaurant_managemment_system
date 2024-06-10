import{addressService,getaddressService,createaddressService,updateaddressService,deleteaddressService} from "./address.service";
import { Context } from "hono";
export const listaddress = async (c: Context) => {
    try {
        //limit the number of state to be returned

        const limit = Number(c.req.query('limit'))

        const data = await addressService(limit);
        if (data == null || data.length == 0) {
            return c.text("address not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getaddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getaddressService(id);
    if (user == undefined) {
        return c.text("address not found", 404);
    }
    return c.json(user, 200);
}
export const createaddress = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdstate = await createaddressService(user);


        if (!createdstate) return c.text("address not created", 404);
        return c.json({ msg: createdstate }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateaddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the city
        const searchedstate = await getaddressService(id);
        if (searchedstate == undefined) return c.text("address not found", 404);
        // get the data and update it
        const res = await updateaddressService(id, user);
        // return a success message
        if (!res) return c.text("address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteaddress = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the address
        const state = await getaddressService(id);
        if (state == undefined) return c.text("address not found", 404);
        //deleting the address
        const res = await deleteaddressService(id);
        if (!res) return c.text("address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}