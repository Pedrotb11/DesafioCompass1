import mongoose from 'mongoose';
import { model } from 'mongoose';

const TaskSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    taskRelevance: {
        type: Number
    },
    completed: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        timestamps: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default model('Task', TaskSchema);