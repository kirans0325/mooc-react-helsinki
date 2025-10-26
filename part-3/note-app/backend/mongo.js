const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nid:${password}@cluster0.enrt5wv.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [
  {
    content: 'HTML is easy',
    important: true,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
  {
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: false,
  },
  {
    content: 'CSS makes websites look beautiful',
    important: true,
  },
  {
    content: 'MongoDB is a NoSQL database',
    important: false,
  }
]

// Use insertMany for bulk insertion
async function main() {
  try {
    // Save notes
    const savedNotes = await Note.insertMany(notes)
    console.log(`${savedNotes.length} notes saved successfully!`)
    
    // Fetch all notes
    const allNotes = await Note.find({})
    console.log('\nAll notes in database:')
    allNotes.forEach(note => {
      console.log(note)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    mongoose.connection.close()
  }}
  main()