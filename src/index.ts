import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { stateRouter } from './state/state.router'

const app=new Hono()
app.get('/',(c)=>{
    return c.text("hello world")
})
app.get('/w',(c)=>{
    return c.text("backend is interesting")
})

const port=3000
serve({
    fetch:app.fetch,
    port
})
app.get('')
app.route("/state", stateRouter)   // /users





// function f(nam:string){
//     console.log("ts configuration");
// }
// f("hello");
