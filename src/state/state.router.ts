
import { Hono } from "hono";
import { createstate, getstate} from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
export const stateRouter = new Hono();
// stateRouter.get("/state", zValidator('json', stateSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), createstate)
stateRouter.get("/states", getstate);
stateRouter.put("/state/:id", createstate)
stateRouter.delete("/state/:id", )