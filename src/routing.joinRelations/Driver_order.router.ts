import { Hono } from "hono";
import { Driver_order } from "./Driver_oder.controller";
export const RoutdriveRelated=new Hono()
RoutdriveRelated.get('/join',Driver_order)