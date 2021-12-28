const mongoose = require('../../database');

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


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;