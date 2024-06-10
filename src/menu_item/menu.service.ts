import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TImenu,TSmenu,tableMenu_item,}from "../drizzle/schema"
export const menuService = async (limit?: number): Promise<TSmenu[] | null> => {
    if (limit) {
        return await db.query.tableMenu_item.findMany({
            limit: limit
        });
    }
    return await db.query.tableMenu_item.findMany();
}

export const getmenuService = async (id: number): Promise<TImenu | undefined> => {
    return await db.query.tableMenu_item.findFirst({
        where: eq(tableMenu_item.id, id)
    })
}

export const createmenuService = async (menu: TImenu) => {
    await db.insert(tableMenu_item).values(menu)
    return "menu created successfully";
}

export const updatemenuService = async (id: number, menu: TImenu) => {
    await db.update(tableMenu_item).set(menu).where(eq(tableMenu_item.id, id))
    return "menu updated successfully";
}

export const deletemenuService = async (id: number) => {
    await db.delete(tableMenu_item).where(eq(tableMenu_item.id, id))
    return "menu deleted successfully";
}
