import { useState, useEffect } from "react"
import axios from "axios"
import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountryDetails"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])

  // Fetch all countries once
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
  }, [])

  // Filter whenever search changes
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered([])
      return
    }
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(results)
  }, [search, countries])

  return (
    <div>
      <h1>Country Information</h1>
      find countries:{" "}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type a country name"
      />

      {filtered.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filtered.length > 1 && filtered.length <= 10 && (
        <CountryList
          countries={filtered}
          onShow={(countryName) => setSearch(countryName)}
        />
      )}

      {filtered.length === 1 && (
        <CountryDetails country={filtered[0]} />
      )}
    </div>
  )
}

export default App
