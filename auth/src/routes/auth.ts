import express from 'express'
import { login, register, me, protect, logout } from "../controller/auth"

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.get('/me', protect, me)

export default router;