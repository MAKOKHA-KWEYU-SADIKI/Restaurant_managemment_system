import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIorder,TSorder,tableOrders,}from "../drizzle/schema"
export const orderService = async (limit?: number): Promise<TSorder[] | null> => {
    if (limit) {
        return await db.query.tableOrders.findMany({
            limit: limit
        });
    }
    return await db.query.tableOrders.findMany();
}

export const getorderService = async (id: number): Promise<TIorder | undefined> => {
    return await db.query.tableOrders.findFirst({
        where: eq(tableOrders.id, id)
    })
}

export const createorderService = async (order: TIorder) => {
    await db.insert(tableOrders).values(order)
    return "order created successfully";
}

export const updateorderService = async (id: number, order: TIorder) => {
    await db.update(tableOrders).set(order).where(eq(tableOrders.id, id))
    return "order updated successfully";
}

export const deleteorderService = async (id: number) => {
    await db.delete(tableOrders).where(eq(tableOrders.id, id))
    return "order deleted successfully";
}
