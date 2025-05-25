const mongoose = require('mongoose')

if (process.argv.length < 2) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]
console.log(process.argv.length)

const url = `mongodb+srv://markusmtervonen:${password}@cluster0.hq6uccl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length >= 4) {
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    console.log(personName, personNumber)

    const person = new Person({
        name: personName,
        number: personNumber,
    })

    person.save().then(result => {
        console.log('contact saved!')
        mongoose.connection.close()
    })

} else {
    console.log('Phonebook:')
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}
