const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '..', 'data', 'tasks.json');

function readTasks() {
  const fileContent = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

function writeTasks(tasks) {
  const jsonContent = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(tasksFilePath, jsonContent, 'utf-8');
}

module.exports = {
  readTasks,
  writeTasks
};
