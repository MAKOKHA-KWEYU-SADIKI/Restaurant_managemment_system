import{listrestaurant,getrestaurant,createrestaurant,updaterestaurant,deleterestaurant} from "./restaurant.control";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator"
import { restaurantSchema } from "../validators"
export const restaurantRouter=new Hono();

restaurantRouter.get("/restaurantList", listrestaurant);

restaurantRouter.get("/restaurantFindONE/:id", getrestaurant)

restaurantRouter.post("/restaurantInsert", zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createrestaurant)

restaurantRouter.put("/restaurantUpdate/:id", updaterestaurant)

restaurantRouter.delete("/restaurantDelete/:id", deleterestaurant)