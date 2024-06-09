import{liststatus_catalog,getstatus_catalog,createstatus_catalog,updatestatus_catalog,deletestatus_catalog} from "./catalog.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { status_catalogSchema } from "../validators";
//import { type Context } from "hono";
export const status_catalogRouter=new Hono();
status_catalogRouter.get("/status_catalogList", liststatus_catalog);
//get a single state    api/sate/1
status_catalogRouter.get("/status_catalogFindONE/:id", getstatus_catalog)
//create a state 
status_catalogRouter.post("/status_catalogInsert", zValidator('json', status_catalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createstatus_catalog)

//update a state
status_catalogRouter.put("/status_catalogUpdate/:id", updatestatus_catalog)
//delete state
status_catalogRouter.delete("/status_catalogDelete/:id", deletestatus_catalog)