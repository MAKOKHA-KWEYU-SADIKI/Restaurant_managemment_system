import { tableOuthuser, TIAuthOnUser, TSAuthOnUser,tableOuthstate,TIAuthOnstate,TSAuthOnstate } from "../drizzle/schema";
import {db} from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(tableOuthuser).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUser) => {
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
                    name: true,
                    contact_phone: true,
                    email:true,
                    address: true,
                    id: true
                }
            }
        }
    })
}
// export const createAuthsateService = async (sate: TIAuthOnstate): Promise<string | null> => {
//     await db.insert(tableOuthstate).values(sate)
//     return "User created successfully";
// }

// export const sateLoginService = async (state: TSAuthOnstate) => {
//     const { statename, password } = state;
//     return await db.query.tableOuthstate.findFirst({
//         columns: {
//             statename: true,
//             role: true,
//             password: true
//         }, where: sql` ${tableOuthuser.username} = ${statename}`,
//         with: {
//             state: {
//                 columns: {
//                     name: true,
//                     code: true,
//                     city:true,
                   
//                 }
//             }
//         }
//     })
// }