import{listrestauranto,getrestauranto,createrestauranto,updaterestauranto,deleterestauranto} from "./restauranto.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator"
import { restaurantoSchema } from "../validators"
export const restaurantoRouter=new Hono();

restaurantoRouter.get("/restaurantoList", listrestauranto);

restaurantoRouter.get("/restaurantoFindONE/:id", getrestauranto)

restaurantoRouter.post("/restaurantoInsert", zValidator('json', restaurantoSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createrestauranto)

restaurantoRouter.put("/restaurantoUpdate/:id", updaterestauranto)

restaurantoRouter.delete("/restaurantoDelete/:id", deleterestauranto)