class CLI {
  static showTasks(tasks) {
    if (tasks.length === 0) {
      console.log("\nAucune tâche.");
    } else {
      console.log("\nListe des tâches :");
      tasks.forEach(task => {
        console.log("-", task.title);
      });
    }
  }

  static taskAdded(task) {
    console.log(`\nTâche ajoutée : ${task.title}`);
  }
}

module.exports = CLI;