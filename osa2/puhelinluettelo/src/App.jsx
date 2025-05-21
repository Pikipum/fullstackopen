import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = (props) => {
  return(
    <li>
      {props.name} {props.number}
    </li>
  )
}

const ShowList = (props) => {
  if(props.results === '') {
    return(
        <ul>
          {props.persons.map(person => 
            <Person key={person.id} name={person.name} number={person.number} />
        )}
        </ul>
    )
  } else {
    let searchResults = props.persons.filter(person => person.name.toLowerCase().includes(props.results))
    console.log(searchResults)
    console.log(props)
      return(  
          <ul>
            {searchResults.map(person => 
              <Person key={person.id} name={person.name} number={person.number} />
          )}
          </ul>
      )
  }
}

function alertMessage(newName) {
  alert(`${newName} is already added to the phonebook`)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchContact, setSearchContact] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const url = 'http://localhost:3001/persons'

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])


  const handleNameSubmission = (event) => {
    event.preventDefault()
    if((persons.map(person => person.name).includes(newName)) != true) {
      let nameObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length+1)
      }
      personService
        .create(nameObject)
          .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons))   
            setNewNumber("")
            setNewName("")
          })              

    } else {
      alertMessage(newName)
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
      <h2>Phonebook</h2>
          <div>Filter phonebook with <input search={searchContact} onChange={handleSearchFieldChange}/></div>
        <div>
          <h1>Add a new contact</h1>
            <form onSubmit={handleNameSubmission}>
              <div>name: <input value={newName} onChange={handleFieldChange}/></div>
              <div>number: <input number={newNumber} onChange={handleNumberFieldChange}/></div>            
            <button type="submit">save</button>
          </form>   
        </div>
      <h2>Numbers</h2>
      <div>
        <ShowList persons={persons} results={searchContact}/>
      </div>
    </div>
  )

}

export default App