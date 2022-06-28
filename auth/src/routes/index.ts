import express from 'express'
import userRouter from './user'
import authRouter from './auth'

declare module 'express-serve-static-core' {
      export interface Request {
        user: any
      }
}
const router = express.Router()

router.use('/', authRouter);
router.use('/', userRouter);

export default router