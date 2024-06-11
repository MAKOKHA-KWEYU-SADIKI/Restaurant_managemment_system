import{Hono} from "hono"
import { zValidator } from "@hono/zod-validator"
import {outhController} from "./outh.controller"
import { TIouth,TSouth,tableOuthstate } from "../drizzle/schema"



export const createstateService=async(state:TIouth):Promise<string | null>=>{
    return "wow state created successful";
}