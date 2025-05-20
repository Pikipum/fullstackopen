import { useState } from 'react'

// const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}>{text}</button>

const Person = (props) => {
  return(
    <li>
      {props.name} {props.number}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0213434324', id: '0' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameSubmission = (event) => {
    event.preventDefault()
    if((persons.map(person => person.name).includes(newName)) != true) {
      let nameObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length)
      }
      setPersons(persons.concat(nameObject))
      setNewNumber("")
      setNewName("")
    } else {
      alert(`${newName} is already added to the phonebook`)
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

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
            <form onSubmit={handleNameSubmission}>
              <div>name: <input value={newName} onChange={handleFieldChange}/></div>
              <div>number: <input number={newNumber} onChange={handleNumberFieldChange}/></div>            
            <button type="submit">save</button>
          </form>   
        </div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => 
            <Person key={person.id} name={person.name} number={person.number} />
        )}
        </ul>
      </div>
    </div>
  )

}

export default App