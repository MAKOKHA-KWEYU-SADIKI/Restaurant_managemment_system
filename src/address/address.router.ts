import{listaddress,getaddress,createaddress,updateaddress,deleteaddress} from "./address.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";

export const addressRouter=new Hono();

addressRouter.get("/addressList", listaddress);

addressRouter.get("/addressFindONE/:id", getaddress)

addressRouter.post("/addressInsert", zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createaddress)


addressRouter.put("/addressUpdate/:id", updateaddress),

addressRouter.delete("/addressDelete/:id", deleteaddress)