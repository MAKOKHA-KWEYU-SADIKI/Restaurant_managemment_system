import{listcity,getcity,createcity,updatecity,deletecity} from "./city.controller";
import{Hono} from "hono"
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
//import { type Context } from "hono";
export const cityRouter=new Hono();
// const city=
     
// [
//     {
//     id:1,
//     name:"Nairobi",
//     code:"577634",
//     city:"Nairobi"
//     },
//    {
//     id:2,
//     name:"Mombasa",
//     code:"437743",
//     city:"Mombasa"
//    }
// ];
// cityRouter.get("/city",(c)=>{
//     return c.json(city,200);
//});
// cityRouter.post('/cityInsert',async(c:Context )=>{
//     const new_city=await c.req.json();
//     console.log(new_city)
//    // if (!new_state){
//    //     return c.text("create a valid state with name,code and city")
 
//    //    }
//      city.push(new_city)
//      return c.json(new_city+"is created") 
 //})
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