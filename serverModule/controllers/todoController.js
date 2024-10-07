// todoController.js
const Task = require('../models/Task');
const User = require('../models/user');

module.exports = {
 
    createTask: async (req, res) => {
        try {
            const { task, description, priority } = req.body;
            const newTask = new Task({
                task,
                description,
                priority,
                status: 'Pending', // Set default status
                user: req.user.id, // Associate the task with the user
            });
    
            await newTask.save();
            res.status(201).json(newTask); // Send back the created task
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Failed to create task' });
        }
    },
    
    showTask: async (req, res) => {
        try {
            const userId = req.user.id; // Assuming you're using authentication middleware to get the user
            const tasks = await Task.find({ user: userId });
            res.json(tasks); // Send the tasks as a JSON response
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Failed to retrieve tasks' });
        }
    },
   
    //     try {
    //         const taskId = req.params.id;
    //         const { task, description, priority, status } = req.body;

    //         const updatedTask = await Task.findByIdAndUpdate(
    //             taskId,
    //             { task, description, priority, status },
    //             { new: true } // Return the updated document
    //         );

    //         if (!updatedTask) {
    //             return res.status(404).json({ message: 'Task not found' });
    //         }

    //         res.status(200).json(updatedTask);
    //     } catch (error) {
    //         console.error('Error updating task:', error);
    //         res.status(500).json({ message: 'Failed to update task' });
    //     }
    // },
    updateTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const updatedTask = req.body;

            const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(task);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Failed to update task' });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            await Task.findByIdAndDelete(taskId);
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Failed to delete task' });
        }
    }
};
