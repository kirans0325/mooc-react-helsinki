const Note = ({ note, toggleImportance }) => {
  return (
    <li>
      {note.content}{" "}
     
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => toggleImportance(note.id)}
      >
        make {note.important ? "Important" : "not important"}
      </button>
    </li>
  );
};

export default Note;
