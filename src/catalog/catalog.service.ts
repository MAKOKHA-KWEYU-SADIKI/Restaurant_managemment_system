import db from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIstatus_catalog,TSstatus_catalog,tableStatus_catalog,}from "../drizzle/schema"
// export const stateservice=async():Promise<TSstate[] |null>=>{
//     return await db.query.tableState.findMany();
//}
export const status_catalogService = async (limit?: number): Promise<TSstatus_catalog[] | null> => {
    if (limit) {
        return await db.query.tableStatus_catalog.findMany({
            limit: limit
        });
    }
    return await db.query.tableStatus_catalog.findMany();
}

export const getstatus_catalogService = async (id: number): Promise<TIstatus_catalog | undefined> => {
    return await db.query.tableStatus_catalog.findFirst({
        where: eq(tableStatus_catalog.id, id)
    })
}

export const createstatus_catalogService = async (state: TIstatus_catalog) => {
    await db.insert(tableStatus_catalog).values(state)
    return "Status_catalog created successfully";
}

export const updatestatus_catalogService = async (id: number, state: TIstatus_catalog) => {
    await db.update(tableStatus_catalog).set(state).where(eq(tableStatus_catalog.id, id))
    return "Status_catalog updated successfully";
}

export const deletestatus_catalogService = async (id: number) => {
    await db.delete(tableStatus_catalog).where(eq(tableStatus_catalog.id, id))
    return "Status_catalog deleted successfully";
}
