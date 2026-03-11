import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    weekStart: {
        type: Date,
        required: true
    },

    weekEnd: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["pending","in-progress","completed"],
        default: "pending"
    }

},
{ timestamps:true }
);

export const Task = mongoose.model("Task", taskSchema);