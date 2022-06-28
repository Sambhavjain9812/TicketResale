import express from 'express'
import { getAllUsers, getUser, updateUser, deleteUser, createUser} from "../controller/user"
import { allow, protect } from "../controller/auth"

const router = express.Router()

router.route('/user')
      .get(getAllUsers)
      .post(createUser)

router.route('/user/:id')
      .get(getUser)
      .patch(updateUser)
      .delete(protect, allow(['admin']),deleteUser);

export default router