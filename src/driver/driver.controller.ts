import{driverService,getdriverService,createdriverService,updatedriverService,deletedriverService} from "./driver.service";
import { Context } from "hono";
export const listdriver = async (c: Context) => {
    try {
       

        const limit = Number(c.req.query('limit'))

        const data = await driverService(limit);
        if (data == null || data.length == 0) {
            return c.text("driver not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getdriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await getdriverService(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
}
export const createdriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createddriver = await createdriverService(driver)
        if (!createddriver) return c.text("driver not created", 404);
        return c.json({ msg: createddriver }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatedriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await c.req.json();
    try {
   
        const searcheddriver = await getdriverService(id);
        if (searcheddriver == undefined) return c.text("driver not found", 404);

        const res = await updatedriverService(id, driver);
    
        if (!res) return c.text("driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletedriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const driver = await getdriverService(id);
        if (driver == undefined) return c.text("driver not found", driver)
        const res = await deletedriverService(id);
        if (!res) return c.text("driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}