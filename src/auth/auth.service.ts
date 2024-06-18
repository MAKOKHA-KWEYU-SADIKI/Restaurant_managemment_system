import { tableOuthuser, TIAuthOnUser, TSAuthOnUser,tableOuthstate,TIAuthOnstate,TSAuthOnstate } from "../drizzle/schema";
import {db} from "../drizzle/db";
import { sql } from "drizzle-orm";
import { sendRegistrationEmail } from "../nodemailer/mails";
export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
   try{
    await db.insert(tableOuthuser).values(user);
    const emailResponse=await sendRegistrationEmail(user.email as string);
    console.log(emailResponse); 

    return "User created successfully";

   } catch(error:any){
    console.log(error)
    throw new error("user creation failed")

   };
   
}

export const userLoginService = async (user: TSAuthOnUser) => {
    const { username, password } = user;
    return await db.query.tableOuthuser.findFirst({
        columns: {
            username: true,
            role: true,
            password: true,
            email:true
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
