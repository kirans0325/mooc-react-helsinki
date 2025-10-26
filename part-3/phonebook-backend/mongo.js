const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nid:${password}@cluster0.enrt5wv.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number, // Keep as Number but data must be numbers
})

const Person = mongoose.model('Person', personSchema)

const persons = [
  { name: "Arto Hellas", number: 40123456 },
  { name: "Ada Lovelace", number: 39445323523 },
  { name: "Dan Abramov", number: 1243234345 },
  { name: "Mary Poppendieck", number: 39236423122 },
  { name: "Mallesh Pot", number: 40236473122 },
];

async function main() {
  try {
    const savedPersons = await Person.insertMany(persons)
    console.log(`${savedPersons.length} persons saved successfully!`)
    
    const allPersons = await Person.find({})
    console.log('\n Phonebook:')
    allPersons.forEach(p => {
      console.log(`${p.name}: ${p.number}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    mongoose.connection.close()
  }
}

main()