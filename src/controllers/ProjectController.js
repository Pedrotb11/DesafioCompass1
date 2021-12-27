import Project from '../models/Project';

class ProjectController {
    async store(request, response) {
        const { title, description, createdAt, updatedAt, tasks } = request.body

        const isProjectRegistered = await Project.findOne({ title });

        if (isProjectRegistered) {
            return response.status(409).json({ error: 'O projeto já está registrado' })
        }

        const project = await Project.create({
            title,
            description,
            createdAt,
            updatedAt,
            tasks,
        })

        return response.status(201).json(project)
    }
}

export default new ProjectController();