import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIstate,TSstate,tableState,}from "../drizzle/schema"
export const stateService = async (limit?: number): Promise<TSstate[] | null> => {
    if (limit) {
        return await db.query.tableState.findMany({
            limit: limit
        });
    }
    return await db.query.tableState.findMany();
}

export const getstateService = async (id: number): Promise<TIstate | undefined> => {
    return await db.query.tableState.findFirst({
        where: eq(tableState.id, id)
    })
}

export const createstateService = async (state: TIstate) => {
    await db.insert(tableState).values(state)
    return "state created successfully";
}

export const updatestateService = async (id: number, state: TIstate) => {
    await db.update(tableState).set(state).where(eq(tableState.id, id))
    return "state updated successfully";
}

export const deletestateService = async (id: number) => {
    await db.delete(tableState).where(eq(tableState.id, id))
    return "state deleted successfully";
}
