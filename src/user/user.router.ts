import{Hono} from "hono"
import { Context } from "hono";
import { listuser, getuser, createuser, updateuser, deleteuser } from "./user.controlller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
export const userRouter=new Hono();
userRouter.get("/userList", listuser);
userRouter.get("/userFindONE/:id", getuser)
userRouter.post("/userInsert", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createuser)
userRouter.put("/userUpdate/:id", updateuser)
userRouter.delete("/userDelete/:id", deleteuser)

