import{listmenu,getmenu,createmenu,updatemenu,deletemenu} from "./menu.controler";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { menuSchema } from "../validators";

export const menuRouter=new Hono();

menuRouter.get("/menuList", listmenu);

menuRouter.get("/menuFindONE/:id", getmenu)

menuRouter.post("/menuInsert", zValidator('json', menuSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createmenu)


menuRouter.put("/menuUpdate/:id", updatemenu)

menuRouter.delete("/menuDelete/:id", deletemenu)