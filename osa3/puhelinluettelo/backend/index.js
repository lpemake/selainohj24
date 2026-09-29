const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: "1"
    },
    { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: "2"
    },
    { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: "3"
    },
    { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: "4"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body)
  console.log(body.name)

if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})