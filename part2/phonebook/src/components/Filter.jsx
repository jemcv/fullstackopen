const Filter = ({ handleSearch }) => {
    return (
    <div>
      <span>filter shown with</span>
      <input onChange={handleSearch} />
    </div>
    )
  }
  
  export default Filter