import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
 
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
        console.log('promise fulfilled', response.data)
      })
      .catch(error => {
        console.log('promise rejected', error)
      })
  }, [])

  console.log(typeof(countries))
  console.log(countries.name)

  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilteredCountries(countries.map(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()) ? country : null).filter(country => country !== null))
  }

  return (
    <div>
      <span>Find Countries</span>
        <input onChange={handleSearch} />
      <div>
        <p>Countries</p>
        {filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> : filteredCountries.length === 0 ? <p> No countries match your search </p> : filteredCountries.map(country => (
          <div key={country.name.common}>
             <h1>{country.name.common}</h1> 
             <p>Capital: {country.capital}</p>
             <p>Area: {country.area}</p>
             <h2>Languages: </h2>
            <ul>
              {Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
