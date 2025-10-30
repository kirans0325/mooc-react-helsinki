require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Person = require("./models/persons");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));


app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(next);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next);
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const newPerson = new Person({ name, number });
  newPerson
    .save()
    .then(savedPerson => res.json(savedPerson))
    .catch(next);
});


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);


const errorHandler = (error, req, res, next) => {
  console.error("Error:", error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "internal server error" });
};
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
