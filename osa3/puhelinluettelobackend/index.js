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

app.get('/info', (request, response, next) => {

    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    if (!name || !number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body

    if (!name || !number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    Person.findOneAndUpdate(
        { name },
        { name, number },
        { new: true, upsert: true, runValidators: true, context: 'query' }
    )
        .then(person => response.json(person))
        .catch(error => next(error))
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