const express = require('express')
const app = express()

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
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": "4"
        }
    ]
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
    response.send(`<p>Phonebok has info for ${phonebook.persons.length} people</p><p>${Date()}</p>`)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})