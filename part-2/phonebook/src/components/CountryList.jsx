const CountryList = ({ countries, onShow }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => onShow(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
