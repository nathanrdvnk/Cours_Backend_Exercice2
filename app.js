const readline = require('readline');
const TaskController = require('./controllers/task_controller');

const READLINE = readline.createInterface({
  input: process.stdin, //Reçoit Terminal comme en C
  output: process.stdout //Affiche Terminal comme en C
});

const controller = new TaskController();

function affichermenu() {
  console.log("\nMenu");
  console.log("1. Ajouter une tâche");
  console.log("2. Supprimer une tâche");
  console.log("3. Afficher les tâches");
  console.log("4. Quitter");
}

function Question(question) {
  return new Promise(resolve => READLINE.question(question, resolve));
}

async function main() {
  while (true) {
    affichermenu();
    const choix = await Question("Choisissez une option : ");

    if (choix === "1") {
      const title = await Question("\nEntrez le titre de la tâche : ");
      controller.add(title);

    } else if (choix === "2") {
      const title = await Question("\nEntrez le titre de la tâche à supprimer : ");
      controller.delete(title);

    } else if (choix === "3") {
      controller.display();

    } else if (choix === "4") {
      console.log("A bientôt");
      READLINE.close();
      break;

    } else {
      console.log("Option invalide.");
    }
  }
}

main();
