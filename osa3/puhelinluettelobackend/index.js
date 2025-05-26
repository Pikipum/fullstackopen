require('dotenv').config()
const express = require('express')
const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)

const morgan = require('morgan')

morgan.token('persons', function (req, res) {
    return (JSON.stringify(req.body))
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :persons'))

const cors = require('cors')
app.use(cors())

const Person = require('./models/person')

/*
let phonebook =
{
    "persons": [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": "1"
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": "2"
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": "3"
        },
        {
            "name": "TestGuy",
            "number": "12345678",
            "id": "123"
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": "4"
        }
    ]
}
    */

const randomId = () => {
    return Math.floor(Math.random() * 10000)
}

app.get('/', (request, response, next) => {
    response.send('<h1>Hello World!</h1>')
    console.log('Hello world sent!')
        .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
        .catch(error => next(error))
})
/*
response.json(phonebook.persons)
console.log('Phonebook sent!')
*/


app.get('/info', (request, response, next) => {
    response.send(`<p>Phonebook has info for ${phonebook.persons.length} people</p><p>${Date()}</p>`)
    console.log('Phonebook sent!')
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })/*
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
            */
        .catch(error => next(error))
})
/*
const id = request.params.id
let person = phonebook.persons.find(person => person.id == id)
if (person) {
    response.json(person)
    console.log('Contact sent')
} else {
    return response.status(404).json({
        error: 'content missing'
    }).end()
}
    */


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

/*
const id = request.params.id
 
phonebook.persons = phonebook.persons.filter(person => person.id !== id)
response.status(204).end()
*/


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    /*
        if (phonebook.persons.some(person => person.name === body.name)) {
            return response.status(400).json({
                error: 'name already in phonebook'
            })
        }
            */

    const addPerson = new Person({
        name: body.name,
        number: body.number,
        id: randomId()
    })

    addPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
    /*
    phonebook.persons = phonebook.persons.concat(addPerson)
    response.json(addPerson)
    */

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})