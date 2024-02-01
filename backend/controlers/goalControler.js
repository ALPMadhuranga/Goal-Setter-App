import asyncHandler from "express-async-handler"
import goalModel from "../model/goalModel.js"

//@desc Get goals
//@route GET /api/goals
//@access private
export const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find()

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

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})



//@desc Delete goal
//@route DELETE /api/goals/:id
//@access private
export const deleteGoal = asyncHandler(async (req, res) => {
    const {id} = req.params
    const goal = await goalModel.findById(id)

    if (!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }
    await goalModel.findByIdAndDelete(id)
    res.status(200).json({id})
})
