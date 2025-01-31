import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'
 
 
const app=new Hono()
const customTimeoutException = () =>
    new HTTPException(408, {
      message: `Request timeout after waiting for more than 10 seconds`,
})
  
const { printMetrics, registerMetrics } = prometheus()
  
app.use(logger()) 
app.use(csrf()) 
app.use(trimTrailingSlash()) 
app.use('/timing', timeout(10000, customTimeoutException))
app.use('*', registerMetrics)
app.get('/',(c)=>{
    return c.html(`<h1>Welcome to my Restaurant Server</h1><br>
         <h2> MAKOKHA SADIKI</h2>`)
 })   
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
app.route('/api',stateRouter)
app.route('/api',cityRouter)
app.route('/api',categoryRouter)
app.route('/api',status_catalogRouter)
app.route('/api',addressRouter)
app.route('/api',userRouter)
app.route('/api',commentRouter)
app.route('/api',driverRouter)
app.route('/api',menuRouter)
app.route('/api',ordermRouter)
app.route('/api',ordersRouter)
app.route('/api',orderRouter)
app.route('/api',restaurantRouter)
app.route('/api',restaurantoRouter)
app.route('/api/auth/',authRouter)
app.route('/api',RoutdriveRelated)


app.notFound((c)=>{
    return c.text("service not found",404)
})
const port=3000
serve({
    fetch:app.fetch,
    port:Number(process.env.PORT || 3000)
})
console.log('service is runnig at port 3000')

import { sendRegistrationEmail } from './nodemailer/mails'
const main = async () => {
    const userEmail = process.env.EMAIL; // Replace with the actual user email
    try {
        const emailResponse = await sendRegistrationEmail(userEmail as string);
        console.log(emailResponse);
    } catch (error: any) {
        console.error('Error sending registration email:', error.message);
    }
};
main();