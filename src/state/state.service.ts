//  import { eq } from "drizzle-orm";
//  import db from "../drizzle/db";

import { TIstate, TSstate } from "../drizzle/schema";


import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { tableState } from "../drizzle/schema";
import { pgTable } from "drizzle-orm/pg-core";


export const createstate = async (user: TIstate) => {
    await db.insert(tableState).values(user)
    return "User created successfully";
}
export const stateService = async (limit?: number): Promise<TSstate[] | null> => {
    if (limit) {
        return await db.query.tableState.findMany({
            limit: limit
        });
    }
    return await db.query.tableState.findMany();
}