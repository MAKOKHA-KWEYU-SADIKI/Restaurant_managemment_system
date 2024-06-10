import{listdriver,getdriver,createdriver,updatedriver,deletedriver} from "./driver.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";

export const driverRouter=new Hono();

driverRouter.get("/driverList", listdriver);

driverRouter.get("/driverFindONE/:id", getdriver)

driverRouter.post("/driverInsert", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createdriver)


driverRouter.put("/driverUpdate/:id", updatedriver)

driverRouter.delete("/driverDelete/:id", deletedriver)