import { serve } from '@hono/node-server'
import { Hono } from 'hono'

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
  
app.use(logger()) 
app.use(csrf()) 
app.use(trimTrailingSlash()) 
app.use('/', timeout(10000, customTimeoutException))
app.use('*', registerMetrics)
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000))
    return c.text("data after 5 seconds", 200)
  })
  app.get('/metrics', printMetrics)
   
import { stateRouter } from './state/state.router'
import { cityRouter } from './city/city.router'
import{categoryRouter} from './category/category.router'
import{status_catalogRouter} from './catalog/catalog.router'
import { addressRouter } from './address/address.router'
import { userRouter } from './user/user.router'
import { commentRouter } from './comment/comment.router'
import { driverRouter } from './driver/driver.router'
import { menuRouter } from './menu_item/menu.router'
import { ordermRouter } from './order_menu item/orderm.router'
import { ordersRouter } from './order_status/orders.router'
import { orderRouter } from './orders/order.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { restaurantoRouter } from './restaurant_owner/reustauranto.router'
import { authRouter } from './auth/auth.router'
import { RoutdriveRelated } from './routing.joinRelations/Driver_order.router'
app.route('/',stateRouter)
app.route('/',cityRouter)
app.route('/',categoryRouter)
app.route('/',status_catalogRouter)
app.route('/',addressRouter)
app.route('/',userRouter)
app.route('/',commentRouter)
app.route('/',driverRouter)
app.route('/',menuRouter)
app.route('/',ordermRouter)
app.route('/',ordersRouter)
app.route('/',orderRouter)
app.route('/',restaurantRouter)
app.route('/',restaurantoRouter)
app.route('auth/',authRouter)
app.route('/',RoutdriveRelated)

app.get('/',(c)=>{
    return c.html(`<h1>Welcome to my Restaurant Server</h1><br>
        <h2> MAKOKHA SADIKI</h2>`)
})
app.get('/w',(c)=>{
    return c.text("backend is interesting")
})
app.notFound((c)=>{
    return c.text("service not found",404)
})
const port=3000
serve({
    fetch:app.fetch,
    port
})
console.log('service is runnig at port 3000')

