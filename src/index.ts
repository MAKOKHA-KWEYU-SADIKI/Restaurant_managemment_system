import { serve } from '@hono/node-server'
import { Hono } from 'hono'
//import { state } from './state/state.router'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'
 
 
const app=new Hono().basePath('/api')
const customTimeoutException = () =>
    new HTTPException(408, {
      message: `Request timeout after waiting for more than 10 seconds`,
})
  
const { printMetrics, registerMetrics } = prometheus()
  
  // inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))
//3rd party middlewares
app.use('*', registerMetrics)
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000))
    return c.text("data after 5 seconds", 200)
  })
  app.get('/metrics', printMetrics)
   
import { stateRouter } from './state/state.router'

app.get('/',(c)=>{
    return c.text("hello world")
})
app.get('/w',(c)=>{
    return c.text("backend is interesting")
})
app.notFound((c)=>{
    return c.text("service not found",404)
})
//app.route('/api',stateRouter)
const port=3000
serve({
    fetch:app.fetch,
    port
})
app.route('/api',stateRouter)
// serve({
//     fetch:app.fetch,
//     port:Number(process.env.PORT) 
// })
console.log('service is runnig at port 3000')
//app.route("/state", stateRouter)   


//app.route('/state',stateRouter);


// function f(nam:string){
//     console.log("ts configuration");
// }
// f("hello");
