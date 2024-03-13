import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from '../services/person'
import Notification from './components/Notification'
import './index.css'
//import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  /*[
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]*/
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
        console.log(initialPersons)
    })
  }, [])

  console.log(persons.length)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    }
  
    if (persons.some(person => person.name === newName)) {
      handleSameName()
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setStatus('success')
      }).catch(error => {
        setMessage(error.response.data.error)
        setStatus('error')
        console.log(error.response.data)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSameName = () => {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber }
      console.log(changedPerson)
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(prevPersons => prevPersons.map(p => p.id !== person.id ? p : returnedPerson))
          setFilteredPersons(prevFilteredPersons => prevFilteredPersons.map(p => p.id !== person.id ? p : returnedPerson))
        })   
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`, error)
          setStatus('error')
          setTimeout(() => {
          }, 5000)
        })
    }
  }

  const handleSearch = (event) => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Failed to delete person:', error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status}/>
      <Filter handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onClick={handleDelete} />
    </div>
  )
}

export default App
