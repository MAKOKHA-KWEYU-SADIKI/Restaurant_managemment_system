import {Context} from "hono"
import{} from "bcrypt"
import { createstateService } from "./outh.service";
export const registerstate=async (c:Context)=>{
 try{
       const state=await c.req.json();
       const createstate=await createstateService(state);
    }
}
export const loginstate=async(c:Context)=>{

}