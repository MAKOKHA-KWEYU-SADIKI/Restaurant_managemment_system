import{Context} from "hono";

import { TIstate, tableState } from '../drizzle/schema';

// async function insertState() {
//   await db.insert(tableState).values({
//     name: 'Nairobi',
//     code: '23532',
//     city: 'nairobi',
//   });
// }
// insertState().catch(console.error);
export const createstate = async (c: Context) => {
    try {

        const data = createstate;
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const getstate = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const states =  getstate;
    if (states == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(states, 200);
}

export const updateUserService = async (id: number, user: TIstate) => {
    await db.update(tableState).set(user).where(eq(tableState, id))
    return "User updated successfully";
}
