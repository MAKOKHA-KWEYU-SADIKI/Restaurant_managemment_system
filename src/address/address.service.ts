import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIaddress,TSaddress,tableAddress,}from "../drizzle/schema"
export const addressService = async (limit?: number): Promise<TSaddress[] | null> => {
    if (limit) {
        return await db.query.tableAddress.findMany({
            limit: limit
        });
    }
    return await db.query.tableAddress.findMany();
}

export const getaddressService = async (id: number): Promise<TIaddress | undefined> => {
    return await db.query.tableAddress.findFirst({
        where: eq(tableAddress.id, id)
    })
}

export const createaddressService = async (address: TIaddress) => {
    await db.insert(tableAddress).values(address)
    return "address created successfully";
}

export const updateaddressService = async (id: number, address: TIaddress) => {
    await db.update(tableAddress).set(address).where(eq(tableAddress.id, id))
    return "address updated successfully";
}

export const deleteaddressService = async (id: number) => {
    await db.delete(tableAddress).where(eq(tableAddress.id, id))
    return "address deleted successfully";
}
