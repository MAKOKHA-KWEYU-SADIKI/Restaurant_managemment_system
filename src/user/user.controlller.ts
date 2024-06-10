import { Context } from "hono";
import { userService, getuserService, createuserService, updateuserService, deleteuserService, } from "./user.sevice";
export const listuser = async (c: Context) => {
    try {
        //limit the number of state to be returned

        const limit = Number(c.req.query('limit'))

        const data = await userService(limit);
        if (data == null || data.length == 0) {
            return c.text("user not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getuser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await getuserService(id);
    if (state == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(state, 200);
}
export const createuser = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdstate = await createuserService(state);


        if (!createdstate) return c.text("user not created", 404);
        return c.json({ msg: createdstate }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateuser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
        // search for the state
        const searchedstate = await getuserService(id);
        if (searchedstate == undefined) return c.text("state not found", 404);
        // get the data and update it
        const res = await updateuserService(id, state);
        // return a success message
        if (!res) return c.text("user not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteuser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the state
        const state = await getuserService(id);
        if (state == undefined) return c.text("user not found", 404);
        //deleting the state
        const res = await deleteuserService(id);
        if (!res) return c.text("user not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
