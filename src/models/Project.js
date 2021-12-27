import mongoose from 'mongoose';
import { model } from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, { timestamps: true });


export default model('Project', ProjectSchema);