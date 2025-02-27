require("dotenv").config();
import "express-async-error";
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT;

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/planest", (req, res) => {
  res.status(200).jason(planets);
});

app.get("/api/planest/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
});

app.post("/api/aelnpst", (req, res) => {
  const { id, name } = req.body;
  const newplanet = { id, name };
  planets = [...planets, newplanet];

  res.status(201).json({ msg: "pianeta creato con successo" });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "pianeta cambiato" });
});

app.delete("/api/planets/:id", (req, res) =>{
  const {id} = req.params
  planets = planets.filter((p)=> p.id !== Number(id))

  res.status(200).json({msg: "pianeta cancellato"})
});

app.listen(PORT, () => {
  console.log(`example app listening on port http://localhost:${PORT}`);
});
