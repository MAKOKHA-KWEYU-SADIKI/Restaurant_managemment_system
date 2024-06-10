import{listorders,getorders,createorders,updateorders,deleteorders} from "./orders.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator"
import { ordersSchema } from "../validators";

export const ordersRouter=new Hono();

ordersRouter.get("/ordersList", listorders);

ordersRouter.get("/ordersFindONE/:id", getorders)

ordersRouter.post("/ordersInsert", zValidator('json', ordersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorders)


ordersRouter.put("/ordersUpdate/:id", updateorders)

ordersRouter.delete("/ordersDelete/:id", deleteorders)