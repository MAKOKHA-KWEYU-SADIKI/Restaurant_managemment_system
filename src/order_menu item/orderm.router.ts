import{listorderm,getorderm,createorderm,updateorderm,deleteorderm} from "./orderm.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator"
import { ordermSchema } from "../validators";

export const ordermRouter=new Hono();

ordermRouter.get("/ordermList", listorderm);

ordermRouter.get("/ordermFindONE/:id", getorderm)

ordermRouter.post("/ordermInsert", zValidator('json', ordermSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorderm)


ordermRouter.put("/ordermUpdate/:id", updateorderm)

ordermRouter.delete("/ordermDelete/:id", deleteorderm)