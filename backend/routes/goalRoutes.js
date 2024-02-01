import express from 'express'
import { deleteGoal, getGoals, setGoal, updateGoal } from '../controlers/goalControler.js'

const router = express.Router()

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

export default router