
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { registerUser, loginUser } from './outh.controller'
import { createuser,listuser,deleteuser,updateuser } from '../user/user.controlller'
import { registeruserSchema, loginuserSchema } from '../validators'
import { authMiddleware,verifyToken,adminRoleAuth,userRoleAuth } from '../middleware/middleware'
export const outhRouter = new Hono();

outhRouter.get('/l',adminRoleAuth,userRoleAuth,listuser)
outhRouter.delete('/deleteUser:id',adminRoleAuth,deleteuser)
outhRouter.post('/createUser',adminRoleAuth,createuser)
outhRouter.put('/updateUser:id',adminRoleAuth,updateuser)
outhRouter.post('/register', zValidator('json', registeruserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerUser)

outhRouter.post('/login', zValidator('json', loginuserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUser)
