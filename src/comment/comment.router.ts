import{listcomment,getcomment,postcomment,updatecomment,deletecomment} from "./comment.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";

export const commentRouter=new Hono();

commentRouter.get("/commentList", listcomment);

commentRouter.get("/commentFindONE/:id", getcomment)
 
commentRouter.post("/commentInsert", zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), postcomment)


commentRouter.put("/commentUpdate/:id", updatecomment)

commentRouter.delete("/commentDelete/:id", deletecomment)