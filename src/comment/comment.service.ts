import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIcity,TScity,tableCity,}from "../drizzle/schema"
export const cityService = async (limit?: number): Promise<TScity[] | null> => {
    if (limit) {
        return await db.query.tableCity.findMany({
            limit: limit
        });
    }
    return await db.query.tableCity.findMany();
}

export const getcityService = async (id: number): Promise<TIcity | undefined> => {
    return await db.query.tableCity.findFirst({
        where: eq(tableCity.id, id)
    })
}

export const createcityService = async (city: TIcity) => {
    await db.insert(tableCity).values(city)
    return "city created successfully";
}

export const updatecityService = async (id: number, city: TIcity) => {
    await db.update(tableCity).set(city).where(eq(tableCity.id, id))
    return "city updated successfully";
}

export const deletecityService = async (id: number) => {
    await db.delete(tableCity).where(eq(tableCity.id, id))
    return "city deleted successfully";
}
