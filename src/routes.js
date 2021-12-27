import express from 'express';
import ProjectController from './controllers/ProjectController';
import { storeTask } from './controllers/TaskController';

const routes = express.Router();

routes.post('/', async(req, res) => {
    try {
        const { title, description, tasks } = req.body;

        const project = await Project.create({ title, description });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask); //task
        }));

        await project.save();

        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'err creating new project' });
    }
})

export default routes;