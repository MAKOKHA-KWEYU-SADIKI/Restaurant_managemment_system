import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIorders,TSorders,tableOrder_status,}from "../drizzle/schema"
export const ordersService = async (limit?: number): Promise<TSorders[] | null> => {
    if (limit) {
        return await db.query.tableOrder_status.findMany({
            limit: limit
        });
    }
    return await db.query.tableOrder_status.findMany();
}

export const getordersService = async (id: number): Promise<TIorders | undefined> => {
    return await db.query.tableOrder_status.findFirst({
        where: eq(tableOrder_status.id, id)
    })
}

export const createordersService = async (menu: TIorders) => {
    await db.insert(tableOrder_status).values(menu)
    return "orders created successfully";
}

export const updateordersService = async (id: number, menu: TIorders) => {
    await db.update(tableOrder_status).set(menu).where(eq(tableOrder_status.id, id))
    return "orders updated successfully";
}

export const deleteordersService = async (id: number) => {
    await db.delete(tableOrder_status).where(eq(tableOrder_status.id, id))
    return "orders deleted successfully";
}
