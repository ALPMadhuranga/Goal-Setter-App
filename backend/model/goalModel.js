import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    user: {                                         // Select which user add that goal
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text field']
    }
},{
    timestamps: true,
})

const goalModel = mongoose.model('Goal', goalSchema);
export default goalModel;