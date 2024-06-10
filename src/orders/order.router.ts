import{listorder,getorder,createorder,updateorder,deleteorder} from "./order.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator"
import { orderSchema } from "../validators";
export const orderRouter=new Hono();
orderRouter.get("/orderList", listorder);

orderRouter.get("/orderFindONE/:id", getorder)

orderRouter.post("/orderInsert", zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorder)


orderRouter.put("/orderUpdate/:id", updateorder)

orderRouter.delete("/orderDelete/:id", deleteorder)