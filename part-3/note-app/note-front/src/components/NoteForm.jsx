import { useState } from "react";

const NoteForm = ({ onAddNote }) => {
  const [noteInput, setNoteInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddNote(noteInput);
    setNoteInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="Write a new note..."
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
