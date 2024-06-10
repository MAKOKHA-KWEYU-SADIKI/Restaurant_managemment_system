import{listcity,getcity,createcity,updatecity,deletecity} from "./city.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
//import { type Context } from "hono";
export const cityRouter=new Hono();

cityRouter.get("/cityList", listcity);
//get a single state    api/sate/1
cityRouter.get("/cityFindONE/:id", getcity)
//create a state 
cityRouter.post("/cityInsert", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcity)

//update a state
cityRouter.put("/cityUpdate/:id", updatecity)
//delete state
cityRouter.delete("/cityDelete/:id", deletecity)