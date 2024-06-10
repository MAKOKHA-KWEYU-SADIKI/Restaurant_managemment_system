import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIdriver,TSdriver,tableDriver,}from "../drizzle/schema"
export const driverService = async (limit?: number): Promise<TSdriver[] | null> => {
    if (limit) {
        return await db.query.tableDriver.findMany({
            limit: limit
        });
    }
    return await db.query.tableDriver.findMany();
}

export const getdriverService = async (id: number): Promise<TIdriver | undefined> => {
    return await db.query.tableDriver.findFirst({
        where: eq(tableDriver.id, id)
    })
}

export const createdriverService = async (city: TIdriver) => {
    await db.insert(tableDriver).values(city)
    return "driver created successfully";
}

export const updatedriverService = async (id: number, city: TIdriver) => {
    await db.update(tableDriver).set(city).where(eq(tableDriver.id, id))
    return "driver updated successfully";
}

export const deletedriverService = async (id: number) => {
    await db.delete(tableDriver).where(eq(tableDriver.id, id))
    return "driver deleted successfully";
}
