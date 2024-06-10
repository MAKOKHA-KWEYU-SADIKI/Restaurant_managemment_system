import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIorderm,TSorderm,tableOder_menu_item,}from "../drizzle/schema"
export const ordermService = async (limit?: number): Promise<TSorderm[] | null> => {
    if (limit) {
        return await db.query.tableOder_menu_item.findMany({
            limit: limit
        });
    }
    return await db.query.tableOder_menu_item.findMany();
}

export const getordermService = async (id: number): Promise<TIorderm | undefined> => {
    return await db.query.tableOder_menu_item.findFirst({
        where: eq(tableOder_menu_item.id, id)
    })
}

export const createordermService = async (menu: TIorderm) => {
    await db.insert(tableOder_menu_item).values(menu)
    return "orderm created successfully";
}

export const updateordermService = async (id: number, menu: TIorderm) => {
    await db.update(tableOder_menu_item).set(menu).where(eq(tableOder_menu_item.id, id))
    return "orderm updated successfully";
}

export const deleteordermService = async (id: number) => {
    await db.delete(tableOder_menu_item).where(eq(tableOder_menu_item.id, id))
    return "menu deleted successfully";
}
