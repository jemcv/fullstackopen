require('dotenv').config()
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const Person = require('./models/person')

const app = express();

app.use(express.json());
app.use(cors());

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
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body 

    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId(),
    })

    if (persons.some(p => p.name === person.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    } else if (persons.some(p => p.number === person.number)) {
        return response.status(400).json({ 
            error: 'number must be unique' 
        })
    }

    /* persons = persons.concat(person) */
    
    person.save().then(personSaved => {
        response.json(personSaved)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })    
})
  
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})