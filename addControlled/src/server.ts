require("dotenv").config();
import "express-async-error";
import express from "express";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controlled/planets.js";

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

app.get("/api/planest", getAll);

app.get("/api/planest/:id", getOneById);

app.post("/api/aelnpst", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.listen(PORT, () => {
  console.log(`example app listening on port http://localhost:${PORT}`);
});
