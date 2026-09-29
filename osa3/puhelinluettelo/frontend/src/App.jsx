import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person, deleteButtonHandler}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deleteButtonHandler}> Delete </button>
    </li>
  )
}

const AddPersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>        
      <div>
        <button type="submit">add</button>
      </div>
    </form>    
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // submit-nappulan tapahtumankäsittelijä
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    // jos nimi on jo listassa, estä lisääminen
    const index = persons.findIndex(person => person.name === newName)
    if (index !== -1) {
      alert('henkilö oli jo listassa')
    }
    else
    {
      // tehdään uusi olio
      const person = { name: newName, number: newNumber }
      // lähetä uusi olio palvelimelle POST:lla

     axios
      .post('http://localhost:3001/persons', person)
      .then(response => {
        console.log(response)
        // lisätään olio listaan
        setPersons(persons.concat(response.data))        
      })      
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const deleteButtonHandler = (id) => {
    console.log('person ' + id + ' clicked')

    const url = `http://localhost:3001/persons/${id}`
  
    axios
      .delete(url)
      .then(response => {
        // listan päivitys
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person =>
            <Person
              key={person.id}
              person={person}
              deleteButtonHandler={() => deleteButtonHandler(person.id)}
            />          
        )}
      </ul>
    </div>
  )

}

export default App