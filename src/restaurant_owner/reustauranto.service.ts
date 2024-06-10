import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIrestauranto,TSrestauranto,tableRestaurant_owner,}from "../drizzle/schema"
export const restaurantoService = async (limit?: number): Promise<TSrestauranto[] | null> => {
    if (limit) {
        return await db.query.tableRestaurant_owner.findMany({
            limit: limit
        });
    }
    return await db.query.tableRestaurant_owner.findMany();
}

export const getrestaurantoService = async (id: number): Promise<TIrestauranto | undefined> => {
    return await db.query.tableRestaurant_owner.findFirst({
        where: eq(tableRestaurant_owner.id, id)
    })
}

export const createrestaurantoService = async (restauranto: TIrestauranto) => {
    await db.insert(tableRestaurant_owner).values(restauranto)
    return "restaurantowner created successfully";
}

export const updaterestaurantoService = async (id: number, restauranto: TIrestauranto) => {
    await db.update(tableRestaurant_owner).set(restauranto).where(eq(tableRestaurant_owner.id, id))
    return "restaurantowner updated successfully";
}

export const deleterestaurantoService = async (id: number) => {
    await db.delete(tableRestaurant_owner).where(eq(tableRestaurant_owner.id, id))
    return "restaurantowner deleted successfully";
}
