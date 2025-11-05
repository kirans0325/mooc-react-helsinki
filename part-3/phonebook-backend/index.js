require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/persons')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${JSON.stringify(req.body)}`)
  next()
}
app.use(requestLogger)

// GET all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(next)
})

// GET person by ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(next)
})

// DELETE person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next)
})

// POST new person (with validation + duplicate check)
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' })
  }

  Person.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        return res
          .status(400)
          .json({ error: 'Name must be unique (use update instead)' })
      }

      const person = new Person({ name, number })

      return person
        .save()
        .then(savedPerson => res.json(savedPerson))
        .catch(next)
    })
    .catch(next)
})

// PUT (update with validation)
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => res.json(updatedPerson))
    .catch(next)
})

// Unknown endpoint
app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

// Centralized Error Handler
app.use((error, req, res) => {
  console.error('Error:', error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  res.status(500).json({ error: 'internal server error' })
})

// Server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
