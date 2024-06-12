
import { tableOuthuser, TIouth, TSouth } from "../drizzle/schema";
import {db} from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createouthUserService = async (user: TIouth): Promise<string | null> => {
    await db.insert(tableOuthuser).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSouth) => {
    const { username, password } = user;
    return await db.query.tableOuthuser.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: sql` ${tableOuthuser.username} = ${username}`,
        with: {
            user: {
                columns: {
                    email_verified: true,
                    contact_phone: true,
                    address: true,
                    id: true
                }
            }
        }
    })
}