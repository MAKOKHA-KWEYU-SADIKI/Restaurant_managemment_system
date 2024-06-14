import{Hono} from "hono"
import { Context } from "hono";
import { liststate, getstate, createstate, updatestate, deletestate } from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
export const stateRouter=new Hono();
stateRouter.get("/stateList", liststate);
stateRouter.get("/stateFindONE/:id", getstate)

stateRouter.post("/stateInsert", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createstate)

stateRouter.put("/stateUpdate/:id", updatestate)
stateRouter.delete("/stateDelete/:id", deletestate)

