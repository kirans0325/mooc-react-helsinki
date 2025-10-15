import React from 'react'

const Persons = ({person}) => {
  return (
    
    <li key={person.id}>
            {person.name} {person.number}
          </li>
  )
}

export default Persons