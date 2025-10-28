const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Get password from command-line argument
const password = process.argv[2];
if (!password) {
  console.error(" Missing MongoDB password argument");
  process.exit(1);
}

// MongoDB connection
const url = `mongodb+srv://nid:${password}@cluster0.enrt5wv.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Schema and Model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

// Routes

// Get all persons
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

// Get person by ID
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete person by ID
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

// Add new person
app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
      return res.status(400).json({ error: "name or number missing" });
    }
    const newPerson = new Person({ name, number });
    const savedPerson = newPerson.save();
    res.json(savedPerson);
  
});

// Info route
app.get("/info", async (req, res) => {
  const count = await Person.countDocuments({});
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
});

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
