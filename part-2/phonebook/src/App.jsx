import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    setFiltered(
      countries.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, countries])

  return (
    <div>
      <h1>Country Finder</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country"
      />

      {filtered.length > 10 && <p>Too many matches, specify another filter.</p>}

      {filtered.length <= 10 && filtered.length > 1 && (
        <ul>
          {filtered.map(country => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => setFiltered([country])}>show</button>
            </li>
          ))}
        </ul>
      )}

      {filtered.length === 1 && (
        <Country country={filtered[0]} />
      )}
    </div>
  )
}

export default App
