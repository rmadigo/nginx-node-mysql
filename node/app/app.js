const express = require("express");
const mysql = require("mysql");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 3000;

// Configurar conexão MySQL
const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

const connection = mysql.createConnection(config);

// Rota principal
app.get("/", (req, res) => {
  let randomName = faker.person.fullName();
  connection.query(`INSERT INTO people(name) VALUES(?)`, [randomName], (e, result) => {
    if (e) throw e;

    connection.query(`SELECT name FROM people`, (e, rows) => {
      if (e) throw e;

      let response = "<h1>Full Cycle Rocks!!</h1><ol>";
      rows.forEach((row) => {
        response += `<li>${row.name}</li>`;
      });
      response += "</ol>";
      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log(`App rondando na porta ${port}`);
});
