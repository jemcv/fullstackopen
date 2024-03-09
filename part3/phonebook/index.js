const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', req => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
  return maxId + 1
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people <br/> <p>${Date()}</p></p>`);
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(person => person.id === Number(request.params.id))
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body 

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }

    if (persons.some(p => p.name === person.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    } else if (persons.some(p => p.number === person.number)) {
        return response.status(400).json({ 
            error: 'number must be unique' 
        })
    }

    persons = persons.concat(person)
    
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    
    response.status(204).end()
})
  
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})