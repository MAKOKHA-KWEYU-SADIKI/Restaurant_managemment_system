import{Hono} from "hono"
import { Context } from "hono";
import { liststate, getstate, createstate, updatestate, deletestate } from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
//import { type Context } from "hono";
export const stateRouter=new Hono();
stateRouter.get("/stateList", liststate);
//get a single state    api/sate/1
stateRouter.get("/stateFindONE/:id", getstate)
// create a state 
stateRouter.post("/stateInsert", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createstate)
//update a state
stateRouter.put("/stateUpdate/:id", updatestate)
//delete state
stateRouter.delete("/stateDelete/:id", deletestate)

