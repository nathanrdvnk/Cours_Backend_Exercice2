const Task = require('../model/task');
const CLI = require('../views/cli');

class TaskController {
  constructor() {
    this.tasks = [];
  }

  add(title) {
    const task = new Task(title);
    this.tasks.push(task);
    CLI.taskAdded(task);
    return task;
  }

  delete(title) {
    const index = this.tasks.findIndex(task => task.title === title);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log(`\nTâche supprimée : ${title}`);
    } else {
      console.log("\nTâche pas trouvée.");
    }
  }

  display() {
    CLI.showTasks(this.tasks);
  }
}

module.exports = TaskController;