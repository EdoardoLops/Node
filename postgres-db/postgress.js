import express from "express";
import "express-async-error";
import morgan from "morgan";
import pgPromise from "pg-promise";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

const db = pgPromise()("postgres://postgres:Bovolone2003@localhost:5432/video");

const setupDb = async () => {
  await db.none(
    `DROP TABLE IF EXISTS planets;
    
        CREATE TABLE planets(
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        );
    `
  );

  await db.none(`INSERT INTO planets (name) VALUE ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUE ('Mars')`);
};
setupDb();

app.get("/api/planest", (req, res) => {
  const planets = db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
});

app.get("/api/planest/:id", (req, res) => {
  const { id } = req.params;
  const planet = db.one(`SELECT * FROM planets WHERE id=$1;`, id);

  res.status(200).json(planet);
});

app.post("/api/planets", (req, res) => {
  const { name } = req.body;
  const newplanet = { name };
  planets = db.none(`INSERT INTO planets (name) VALUES ($1);`, name);

  res.status(201).json({ msg: "pianeta creato con successo" });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = db.none(`UPDATE planets SET name=$2 WHERE id=$1;`, [id, name]);

  res.status(200).json({ msg: "pianeta cambiato" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = db.none(`DELETE FROM planets WHERE id=$1;`, id);

  res.status(200).json({ msg: "pianeta cancellato" });
});

app.listen(PORT, () => {
  console.log(`example app listening on port http://localhost:${PORT}`);
});
