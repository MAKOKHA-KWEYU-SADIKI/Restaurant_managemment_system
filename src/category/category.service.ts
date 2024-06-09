import db from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIcategory,TScategory,tableCategory,}from "../drizzle/schema"
export const categoryService = async (limit?: number): Promise<TScategory[] | null> => {
    if (limit) {
        return await db.query.tableCategory.findMany({
            limit: limit
        });
    }
    return await db.query.tableCategory.findMany();
}

export const getcategoryService = async (id: number): Promise<TIcategory | undefined> => {
    return await db.query.tableCategory.findFirst({
        where: eq(tableCategory.id, id)
    })
}

export const createcategoryService = async (city: TIcategory) => {
    await db.insert(tableCategory).values(city)
    return "category created successfully";
}

export const updatecategoryService = async (id: number, city: TIcategory) => {
    await db.update(tableCategory).set(city).where(eq(tableCategory.id, id))
    return "category updated successfully";
}

export const deletecategoryService = async (id: number) => {
    await db.delete(tableCategory).where(eq(tableCategory.id, id))
    return "category deleted successfully";
}
