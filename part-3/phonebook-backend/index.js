const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(morgan('tiny'))

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  { id: 5, name: "Mallesh Pot", number: "40-23-6473122" },
];

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  person ? res.json(person) : res.send(404).end();
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});


app.get("/info", (req, res) => {
  const total = persons.length;
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${total} people</p>
    <p>${date}</p>
  `);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id !== id);
  person ? res.json(person) : res.send(404).end();
});

app.use(express.json());

app.post('/api/persons', (req, res) => {
  const body = req.body;
    if(!body.name && !body.number){
        return res.send(400).json({ error: 'name or number missing' });
    }
     if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  };

  persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
