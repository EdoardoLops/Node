require("dotenv").config();
import express from "express";
import "express-async-error";
import morgan from "morgan";

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

app.use(express.json())
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`example app listening on port http://localhost:${PORT}`);
});
