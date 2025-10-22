const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: "5",
    name: "Ram k",
    number: "40-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const noOfPersons = persons.length;
  const time = new Date();
  res.send(`<p>phonebook has info of ${noOfPersons} people </p>
   <p> ${time}
    <p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  person ? res.json(person) : res.status(404).end();
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id !== id);
  res.status(204).end();
});

const generateId = () => {
  let newId;
  do {
    newId = String(Math.floor(Math.random() * 10000));
  } while (persons.find((p) => p.id === newId));
  return newId;
};


app.post('/api/persons', (request, response) => {
  const body = request.body

    const person = {
    id: generateId(),
    name: body.name,
    number: body.number || false,
  }
 

  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
