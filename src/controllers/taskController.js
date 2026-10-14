const { readTasks, writeTasks } = require('../utils/fileDb');

function createTask(req, res) {
  try {
    const {
      title,
      description,
      status = 'pending',
      priority,
      assignee
    } = req.body;

    if (!title || !description || !priority || !assignee) {
      return res.status(400).json({
        message: 'title, description, priority ve assignee alanları zorunludur.'
      });
    }

    const tasks = readTasks();

    const newId = tasks.length === 0
      ? 1
      : Math.max(...tasks.map((task) => task.id)) + 1;

    const now = new Date().toISOString();

    const newTask = {
      id: newId,
      title,
      description,
      status,
      priority,
      assignee,
      createdAt: now,
      updatedAt: now
    };

    tasks.push(newTask);
    writeTasks(tasks);

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({
      message: 'Görev oluşturulurken bir hata oluştu.'
    });
  }
}

function getTasks(req, res) {
  try {
    const tasks = readTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: 'Görevler listelenirken bir hata oluştu.'
    });
  }
}

function getTaskById(req, res) {
  try {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const task = tasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({
        message: 'Görev bulunamadı.'
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: 'Görev getirilirken bir hata oluştu.'
    });
  }
}

function updateTask(req, res) {
  try {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: 'Güncellenecek görev bulunamadı.'
      });
    }

    const currentTask = tasks[taskIndex];

    const updatedTask = {
      ...currentTask,
      ...req.body,
      id: currentTask.id,
      createdAt: currentTask.createdAt,
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    writeTasks(tasks);

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      message: 'Görev güncellenirken bir hata oluştu.'
    });
  }
}

function deleteTask(req, res) {
  try {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: 'Silinecek görev bulunamadı.'
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    writeTasks(tasks);

    return res.status(200).json({
      message: 'Görev silindi.',
      task: deletedTask
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Görev silinirken bir hata oluştu.'
    });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
