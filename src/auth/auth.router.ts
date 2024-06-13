import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { registerUser, loginUser } from './auth.controller'
import { registerUserSchema, loginUserSchema } from '../validators'
import { adminRoleAuth,userRoleAuth } from '../middleware/middleware'
import { createuser,getuser,listuser,deleteuser,updateuser } from '../user/user.controlller'


export const authRouter = new Hono();
//authRouter.get("find_one/:id",userRoleAuth,getuser)
authRouter.get("find_one/:id",adminRoleAuth,getuser)
authRouter.get('/list',adminRoleAuth,listuser)
authRouter.delete('/delete/:id',adminRoleAuth,deleteuser)
authRouter.post('/createUser',adminRoleAuth,createuser)
authRouter.put('/update/:id',adminRoleAuth,updateuser)
authRouter.post('/register', zValidator('json', registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerUser)


authRouter.post('/login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUser)