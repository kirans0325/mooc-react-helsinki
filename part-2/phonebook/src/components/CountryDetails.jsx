const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
      <p>Area: {country.area} km²</p>

      <h4>Languages:</h4>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
        style={{ border: "1px solid #ccc", marginTop: "10px" }}
      />
    </div>
  )
}

export default CountryDetails
