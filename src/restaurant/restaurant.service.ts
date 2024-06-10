import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIrestaurant,TSrestaurant,tableRestaurant,}from "../drizzle/schema"
export const restaurantService = async (limit?: number): Promise<TSrestaurant[] | null> => {
    if (limit) {
        return await db.query.tableRestaurant.findMany({
            limit: limit
        });
    }
    return await db.query.tableRestaurant.findMany();
}

export const getrestaurantService = async (id: number): Promise<TIrestaurant | undefined> => {
    return await db.query.tableRestaurant.findFirst({
        where: eq(tableRestaurant.id, id)
    })
}

export const createrestaurantService = async (restaurant: TIrestaurant) => {
    await db.insert(tableRestaurant).values(restaurant)
    return "restaurant created successfully";
}

export const updaterestaurantService = async (id: number, restaurant: TIrestaurant) => {
    await db.update(tableRestaurant).set(restaurant).where(eq(tableRestaurant.id, id))
    return "restaurant updated successfully";
}

export const deleterestaurantService = async (id: number) => {
    await db.delete(tableRestaurant).where(eq(tableRestaurant.id, id))
    return "restaurant deleted successfully";
}
