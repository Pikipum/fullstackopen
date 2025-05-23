const express = require('express')
const app = express()

app.use(express.json())

const morgan = require('morgan')

morgan.token('persons', function (req, res) {
    return (JSON.stringify(req.body))
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :persons'))



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

const randomId = () => {
    return Math.floor(Math.random() * 10000)
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    console.log('Hello world sent!')
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook.persons)
    console.log('Phonebook sent!')
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${phonebook.persons.length} people</p><p>${Date()}</p>`)
    console.log('Phonebook sent!')
})

app.get('/api/persons/:id', (request, response) => {
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
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    phonebook.persons = phonebook.persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if (phonebook.persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name already in phonebook'
        })
    }

    const addPerson = {
        name: body.name,
        number: body.number,
        id: randomId()
    }
    //console.log(addPerson)
    phonebook.persons = phonebook.persons.concat(addPerson)
    response.json(addPerson)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})