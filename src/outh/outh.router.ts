import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerstateSchema } from "../validators";
import { loginstateSchema } from "../validators";
import {registerstate} from './outh.controller'
const outhRouter=new Hono();
outhRouter.post('/regester',zValidator('json',registerstateSchema,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),registerstate)