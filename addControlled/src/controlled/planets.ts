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

const getAll = (req, res) => {
  res.status(200).jason(planets);
};
const getOneById = (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
};
const create = (req, res) => {
  const { id, name } = req.body;
  const newplanet = { id, name };
  planets = [...planets, newplanet];

  res.status(201).json({ msg: "pianeta creato con successo" });
};
const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "pianeta cambiato" });
};
const deleteById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "pianeta cancellato" });
};

export { getAll, getOneById, create, updateById, deleteById };
