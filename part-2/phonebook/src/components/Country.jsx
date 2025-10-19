import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const capital = country.capital?.[0]
    if (!capital) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    axios.get(url).then(response => {
      setWeather(response.data)
    })
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>

      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      {weather && (
        <>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

export default Country
