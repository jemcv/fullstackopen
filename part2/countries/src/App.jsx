import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState(null)

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

  useEffect(() => {
    if (showCountry) {
      const capital = showCountry.capital;
      console.log(capital);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_SOME_KEY}`)
        .then(response => {
          setWeather(response.data);
          console.log('promise fulfilled', response.data);
        })
        .catch(error => {
          console.log('promise rejected', error);
        });
    }
  }, [showCountry]);

  console.log(typeof(countries))
  console.log(countries.name)
  console.log(import.meta.env.VITE_SOME_KEY)

  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilteredCountries(countries.map(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()) ? country : null).filter(country => country !== null))
  }

  const toggleShow = (country) => {
    setShowCountry(showCountry === country ? null : country);
  }
 
  return (
    <div>
      <span>Find Countries</span>
      <input onChange={handleSearch} />
      <div>
        <p>Countries</p>
        {filteredCountries.length > 10 ? 
          <p>Too many matches, specify another filter</p>
        : filteredCountries.length === 0 ? 
          <p>No countries match your search</p>
        : filteredCountries.map(country => (
          <div key={country.name.common}> 
            {filteredCountries.length > 1 && 
              <p>{country.name.common} <button onClick={() => toggleShow(country)}>Show/Hide Country</button></p>
            }
            {(showCountry === country || filteredCountries.length === 1) && (
              <div> 
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
                <div>
                  <h2>Weather in {country.capital}</h2>
                  {weather ? 
                    <div>
                      <p>Temperature: {weather.main?.temp}</p>
                      <img src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}></img>                    
                      <p>Wind: {weather.wind?.speed}</p>
                    </div>
                  : <p>Loading weather...</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
