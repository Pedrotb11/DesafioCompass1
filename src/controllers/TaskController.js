import Task from '../models/Task';

export const storeTask = async(request, response) => {
    const { title, description, createdAt, updatedAt, tasks } = request.body

    const isTaskRegistered = await Task.findOne({ title });

    if (isTaskRegistered) {
        return response.status(409).json({ error: 'O projeto já está registrado' })
    }

    const task = await Task.create({
        title,
        description,
        createdAt,
        updatedAt,
        tasks,
    })

    return response.status(201).json(task)
}