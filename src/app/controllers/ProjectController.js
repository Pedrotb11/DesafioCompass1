const express = require('express');

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const projects = await Project.find().populate(['tasks']);

        return res.status(200).send({ projects });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading projects' });
    }
});

router.get('/:projectId', async(req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(['tasks']);

        return res.status(200).send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading project' });
    }
});

router.post('/', async(req, res) => {
    try {
        const { title, description, tasks } = req.body

        const project = await Project.create({ title, description });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.status(201).send({ project });

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new project' });
    }


});

router.put('/:projectId', async(req, res) => {
    try {
        const { title, description, tasks } = req.body

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description,
        }, { new: true });

        project.tasks = [];
        await Task.remove({ project: project.id });


        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();


        return res.status(200).send({ project });
    } catch (err) {
        return res.status(404).send({ error: 'Error updating project' });
    }
});

router.delete('/:projectId', async(req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId);

        return res.status(204).send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project' });
    }
});

module.exports = app => app.use('/compasso/projects', router)