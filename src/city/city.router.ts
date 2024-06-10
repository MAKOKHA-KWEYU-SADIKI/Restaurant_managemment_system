import{listcity,getcity,createcity,updatecity,deletecity} from "./city.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";

export const cityRouter=new Hono();

cityRouter.get("/cityList", listcity);

cityRouter.get("/cityFindONE/:id", getcity)

cityRouter.post("/cityInsert", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcity)


cityRouter.put("/cityUpdate/:id", updatecity)

cityRouter.delete("/cityDelete/:id", deletecity)