import{listcategory,getcategory,createcategory,updatecategory,deletecategory} from "./category.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
//import { type Context } from "hono";
export const categoryRouter=new Hono();

categoryRouter.get("/categoryList", listcategory);
//get a single category   
categoryRouter.get("/categoryFindONE/:id", getcategory)
//create a category 
categoryRouter.post("/categoryInsert", zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcategory)

//update a category
categoryRouter.put("/categoryUpdate/:id", updatecategory)
//delete category
categoryRouter.delete("/categoryDelete/:id", deletecategory)