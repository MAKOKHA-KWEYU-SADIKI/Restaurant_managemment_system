import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIuser,TSuser,tableUsers,}from "../drizzle/schema"

export const userService = async (limit?: number): Promise<TSuser[] | null> => {
    if (limit) {
        return await db.query.tableUsers.findMany({
            limit: limit
        });
    }
    return await db.query.tableUsers.findMany();
}

export const getuserService = async (id: number): Promise<TIuser | undefined> => {
    return await db.query.tableUsers.findFirst({
        where: eq(tableUsers.id, id)
    })
}

export const createuserService = async (state: TIuser) => {
    await db.insert(tableUsers).values(state)
    return "user created successfully";
}

export const updateuserService = async (id: number, user: TIuser) => {
    await db.update(tableUsers).set(user).where(eq(tableUsers.id, id))
    return "user updated successfullyUser"
}
export const deleteuserService = async (id: number) => {
    await db.delete(tableUsers).where(eq(tableUsers.id, id))
    return "user deleted successfully";
}
