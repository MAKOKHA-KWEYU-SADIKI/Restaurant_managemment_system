import { tableDriver, TSdriver} from "../drizzle/schema";
import { db } from "../drizzle/db";
import { Column, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
export const DriverwithOrders = async(): Promise <TSdriver[] | null> =>{
    return await  db.query.tableDriver.findMany({
        with:{
            order:{
                columns:{
                    restaurant_id: true,
                    delivery_address_id: true,
                    users: true,
                    estimate_delivery_time:true
                }
               

            }
        }
    })
}