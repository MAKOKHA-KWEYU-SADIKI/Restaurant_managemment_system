import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { registerUser, loginUser } from './auth.controller'
import { registerUserSchema, loginUserSchema } from '../validators'
import { authMiddleware,verifyToken,adminRoleAuth,userRoleAuth } from '../middleware/middleware'
import { createuser,listuser,deleteuser,updateuser } from '../user/user.controlller'


export const authRouter = new Hono();

authRouter.get('/l',adminRoleAuth,userRoleAuth,listuser)
authRouter.delete('/deleteUser:id',adminRoleAuth,deleteuser)
authRouter.post('/createUser',adminRoleAuth,createuser)
authRouter.put('/updateUser:id',adminRoleAuth,updateuser)
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