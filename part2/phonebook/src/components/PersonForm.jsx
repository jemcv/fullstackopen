const PersonForm = ({ addName, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <div>
        <form onSubmit={addName}>
        <div>
          name:<input value={newName} onChange={handleNameChange} />
          <br />
          number:<input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm