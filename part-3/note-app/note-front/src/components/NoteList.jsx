import Note from "./Note";

const NoteList = ({ notes, toggleImportance }) => {
  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} toggleImportance={toggleImportance} />
      ))}
    </ul>
  );
};

export default NoteList;
