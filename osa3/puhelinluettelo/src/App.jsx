import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = (props) => {
  console.log(props)
  return (
    <li>
      {props.name} {props.number} {" "}
      <button onClick={() => props.alertDeletePerson(props)}>delete</button>
    </li>
  )
}

const ShowList = (props) => {

  console.log(props)

  if (props.results === '') {
    return (
      <ul>
        {props.persons.map(person =>
          <Person key={person.id} name={person.name} number={person.number} id={person.id} alertDeletePerson={props.alertDeletePerson} />
        )}
      </ul>
    )
  } else {
    let searchResults = props.persons.filter(person => person.name.toLowerCase().includes(props.results))
    console.log(searchResults)
    console.log(props)
    return (
      <ul>
        {searchResults.map(person =>
          <Person key={person.id} name={person.name} number={person.number} id={person.id} alertDeletePerson={props.alertDeletePerson} />
        )}
      </ul>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchContact, setSearchContact] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log(error)

        setErrorMessage(
          `Could not access the server ${error.response.data}.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])

  const alertDeletePerson = (props) => {
    if (window.confirm(`Delete ${props.name}?`)) {
      personService
        .deletePerson(props.id)
        .then(response => {
          console.log('User deleted')
          setPersons(persons.filter(n => n.id !== props.id))

          setErrorMessage(
            `Person '${props.name}' has been deleted from the phonebook.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)

          setErrorMessage(
            `Could not delete '${props.name}' from the phonebook. Already removed from the server ${error.response.data}.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } else {
      console.log("no")
    }
  }

  const handleNameSubmission = (event) => {
    event.preventDefault()
    if ((persons.map(person => person.name).includes(newName)) != true) {
      let nameObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
      personService
        .create(nameObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewNumber("")
          setNewName("")

          setErrorMessage(
            `Person '${newName}' has been added to the phonebook.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)

          setErrorMessage(
            `Could not add '${newName}' to the phonebook. Already removed from the server ${error.response.data}.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })


    } else if ((persons.map(person => person.name).includes(newName)) == true) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        console.log('yes')
        let oldObject = persons.find(({ name }) => name === newName)
        let newObject = { ...oldObject, number: newNumber }

        console.log(oldObject)
        personService
          .update(oldObject.id, newObject)
          .then(returnedPersons => {
            setPersons(persons.map(p => (p.id !== oldObject.id ? p : returnedPersons)))
            setNewNumber("")
            setNewName("")

            setErrorMessage(
              `The number for '${newName}' has been updated.`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)

            setErrorMessage(
              `Could not update number. '${newName}' Already removed from the server ${error.response.data}.`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } else {
        console.log('declined')
      }
    } else {
      setErrorMessage(
        `Person '${newName}' already exists in the phonebook.`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleFieldChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberFieldChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchFieldChange = (event) => {
    console.log(event.target.value)
    setSearchContact(event.target.value)
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <div>Filter phonebook with <input search={searchContact} onChange={handleSearchFieldChange} /></div>
      <div>
        <h1>Add a new contact</h1>
        <form onSubmit={handleNameSubmission}>
          <div>name: <input value={newName} onChange={handleFieldChange} /></div>
          <div>number: <input number={newNumber} onChange={handleNumberFieldChange} /></div>
          <button type="submit">save</button>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        <ShowList persons={persons} results={searchContact} alertDeletePerson={alertDeletePerson} />
      </div>
    </div>
  )

}

export default App