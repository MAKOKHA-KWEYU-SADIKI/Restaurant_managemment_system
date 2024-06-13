import { Context } from "hono"
import { DriverwithOrders } from "./Driver_order.service"

export const Driver_order=async (c:Context)=>{
   const data= await DriverwithOrders();
    if(data==null){
        return c.text("address not found")
    }else{
        return c.json(data,200)
    }

}