require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const { connectMongoDB, connectPostgreSQL } = require('./src/config/db');

//Middleware
app.use(cors());
app.use(express.json());

const mode = process.env.MODE || 'mongo';

let dbClientPromise;

//ConnexionBDD
if (mode === 'mongo') {
  dbClientPromise = connectMongoDB();
} else if (mode === 'postgres') {
  dbClientPromise = connectPostgreSQL();
} else {
  console.error('Mode inconnu, utilisez "mongo" ou "postgres"');
  process.exit(1);
}

//Routes MongoDB
if (mode === 'mongo') {
  const mongoRoutes = require('./src/controllers/functions');
  app.use('/functions', mongoRoutes);
}

//Routes PostgreSQL
if (mode === 'postgres') {
  (async () => {
    try {
      const { initTodo, default: TodoController } = require('./src/controllers/functions2');
      await initTodo();

      //Routes PostgreSQL
      app.get('/todos', TodoController.list);
      app.post('/todos', TodoController.add);
      app.delete('/todos/:id', TodoController.delete);

    } catch (err) {
      console.error('Erreur d’initialisation PostgreSQL :', err.message);
      process.exit(1);
    }
  })();
}
app.listen(3000, () => console.log(`Server started with : ${mode.toUpperCase()}`));
