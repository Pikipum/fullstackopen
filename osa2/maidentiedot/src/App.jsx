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

const Country = (props) => {
  return (
    <li>
      {props.name}
    </li>
  )
}

const Flag = (props) => {
  return (
    <img src={props.flag.png} alt={props.flag.alt} />
  )
}

const CountryExtended = (props) => {
  console.log(props.country[0].name.common)
  const country = props.country[0]
  return (
    <div>
      <h1>{country.name.common} </h1>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} km&sup2; </p>
      <h2>Languages</h2>
      <ShowLanguageList languages={country.languages} />
      <Flag flag={country.flags} />
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

  if (props.search != null) {
    let searchResults = props.countries.filter(country => country.name.common.toLowerCase().includes(props.search))

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
        <ul>
          {searchResults.map(country =>
            <Country key={country.id} name={country.name.common} />
          )}
        </ul>
      )
    } else if (searchResults.length == 1) {
      return (
        <CountryExtended country={searchResults} />
      )
    }
  } else {
    return (
      <div>Type to search</div>
    )
  }

}

function App() {
  const [searchCountry, setSearchCountry] = useState(null)
  const [countryList, setCountryList] = useState([])

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
      <div><ShowList countries={countryList} search={searchCountry} /></div>
    </>
  )
}

export default App
