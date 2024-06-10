import{listaddress,getaddress,createaddress,updateaddress,deleteaddress} from "./address.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
//import { type Context } from "hono";
export const addressRouter=new Hono();

addressRouter.get("/addressList", listaddress);
//get a single state    api/sate/1
addressRouter.get("/addressFindONE/:id", getaddress)
//create a state 
addressRouter.post("/addressInsert", zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createaddress


addressRouter.put("/addressUpdate/:id", updateaddress),

addressRouter.delete("/addressDelete/:id", deleteaddress)