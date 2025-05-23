import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import countryService from './services/countries.js'

const Search = (props) => {
  console.log(props)
  return (
    <input search={props.search} onChange={props.onChange} />
  )
}
const Country = ({ country, onShow }) => {
  return (
    <li>
      {country.name.common} <button onClick={() => onShow(country)}>Show</button>
    </li>
  )
}

const Flag = (props) => {
  return (
    <img src={props.flag.png} alt={props.flag.alt} />
  )
}

const Weather = ({ country, api_key }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        setWeather(null)
        console.log('Could not reach server', error)
      })
  }, [country.capital, api_key])

  if (weather) {
    console.log(weather)
    return (
      <>
        <p>Temperature in {country.capital} {weather.main.temp} °C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>Wind {weather.wind.speed} m/s </p>
      </>
    )
  }
}

const CountryExtended = (props) => {
  const country = props.country

  return (
    <div>
      <h1>{country.name.common} </h1>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} km&sup2; </p>
      <h2>Languages</h2>
      <ShowLanguageList languages={country.languages} />
      <Flag flag={country.flags} />
      <Weather country={country} api_key={props.api_key} />
    </div>
  )
}
const Language = (props) => {
  return (
    <li>
      {props.language}
    </li>
  )
}

const ShowLanguageList = (props) => {
  return (
    <ul>
      {Object.values(props.languages).map(language =>
        <Language key={language.id} language={language} />
      )}
    </ul>
  )
}
const ShowList = (props) => {
  const { countries, search, selectedCountry, setSelectedCountry } = props

  if (search != null) {
    let searchResults = countries.filter(country => country.name.common.toLowerCase().includes(props.search))

    if (searchResults.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (searchResults.length == 0) {
      return (
        <div>No results found</div>
      )
    } else if (searchResults.length > 1) {
      return (
        <>
          {searchResults.map(country =>
            <div key={country.cca3}>
              {selectedCountry && selectedCountry.cca3 === country.cca3
                ? <CountryExtended country={country} api_key={props.api_key} />
                : <Country country={country} onShow={setSelectedCountry} />
              }
            </div>
          )}
        </>
      )
    } else if (searchResults.length == 1) {
      return (
        <CountryExtended country={searchResults[0]} api_key={props.api_key} />
      )
    }
  } else {
    return (
      <div>Type to search</div>
    )
  }

}

function App() {
  const api_key = import.meta.env.VITE_API_KEY
  const [searchCountry, setSearchCountry] = useState(null)
  const [countryList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearchFieldChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        console.log(initialCountries)
        setCountryList(initialCountries)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>
        Country info
      </div>
      <div>Find countries: <Search search={searchCountry} onChange={handleSearchFieldChange} /></div>
      <div><ShowList
        countries={countryList}
        search={searchCountry}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        api_key={api_key}
      />
      </div>
    </>
  )
}

export default App
