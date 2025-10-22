const express = require("express");
const morgan = require('morgan')  
const app = express();

app.use(express.json());
morgan('tiny')

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
if (!body.name||!body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })

  }
if(persons.find(p=>p.name.toLowerCase()===body.name.toLowerCase())){
  return response.status(404).json({errror:"Name must be unique"})
}
    const person = {
    id: generateId(),
    name: body.name,
    number: body.number || false,
  }
 

  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
