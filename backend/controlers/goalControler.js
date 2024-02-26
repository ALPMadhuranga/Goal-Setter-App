import asyncHandler from "express-async-handler"
import goalModel from "../model/goalModel.js"
import userModel from "../model/userModel.js"

//@desc Get goals
//@route GET /api/goals
//@access private
export const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({user: req.user.id})

    res.status(200).json(goals)
})

//@desc Set goal
//@route POST /api/goals
//@access private
export const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

//@desc Update goal
//@route PUT /api/goals/:id
//@access private
export const updateGoal = asyncHandler(async (req, res) => {
    const goal = await goalModel.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})



//@desc Delete goal
//@route DELETE /api/goals/:id
//@access private
export const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    //Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goalModel.findByIdAndDelete()
    res.status(200).json({ id: req.params.id })
})