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

/*
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
*/ 

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response, next) => {
    Person.find({})
    .then(person => {
        response.send(`<p>Phonebook has info for ${person.length} people <br/> <p>${Date()}</p></p>`);
    })
    .catch(error => {
        next(error)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(person => {
        response.json(person)
    })
    .catch(error => {
        next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body 

    const person = {
      name: body.name,
      number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true  })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => {
        next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body 

    if (body.name.length < 3) {
        return response.status(400).json({ 
            error: 'name must be at least 3 characters long' 
        })
    }
    
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    Person.findOne({ name: body.name })
    .then(existingPerson => {
        if(existingPerson) {
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        } else {
            return Person.findOne({ number: body.number })
        }
    })
    .then(existingNumber => {
        if(existingNumber) {
            return response.status(400).json({
                error: 'number must be unique'
            })
        } else {
            return person.save()
        }
    })
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })  
    .catch(error => {
        next(error)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {    
        return response.status(400).json({ error: error.message })  
    }
    next(error)
}

app.use(errorHandler)
  
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})