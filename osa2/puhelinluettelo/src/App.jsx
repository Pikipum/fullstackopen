import { useState } from 'react'

// const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}>{text}</button>

const Person = (props) => {
  return(
    <li>
      {props.name}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '0' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameSubmission = (event) => {
    event.preventDefault()
    let nameObject = {
      name: newName,
      id: String(persons.length)
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  const handleFieldChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          name: 
            <form onSubmit={handleNameSubmission}>
              <input value={newName} onChange={handleFieldChange}/>
            <button type="submit">save</button>
          </form>   
        </div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => 
            <Person key={person.id} name={person.name} />
        )}
        </ul>
      </div>
    </div>
  )

}

export default App