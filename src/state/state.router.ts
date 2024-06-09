import{Hono} from "hono"
import { Context } from "hono";
import { liststate, getstate, createstate, updatestate, deletestate } from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
//import { type Context } from "hono";
export const stateRouter=new Hono();

// const states=
     
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
//getting all users
// stateRouter.get("/state",(c)=>{
//     return c.json(states,200);
// });
// //getting a single state
// stateRouter.get('/state/:id',(c)=>{
//     const id=Number(c.req.param("id"));
//     const state_id=states.find((states)=>states.id===id);
//     if (!state_id){
//         return c.text("invalid id",404) ;
//     }
//     return c.json(id,200)

// })
// //post adding to array
// stateRouter.post('/post',async(c:Context )=>{
//    const new_state=await c.req.json();
//    console.log(new_state)
//   // if (!new_state){
//   //     return c.text("create a valid state with name,code and city")

//   //    }
//     states.push(new_state)
//     return c.json(new_state+"is created") 
// })


stateRouter.get("/stateList", liststate);
//get a single state    api/sate/1
stateRouter.get("/stateFindONE/:id", getstate)
// create a state 
stateRouter.post("/stateInsert", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createstate)
//update a state
stateRouter.put("/stateUpdate/:id", updatestate)
//delete state
stateRouter.delete("/stateDelete/:id", deletestate)

