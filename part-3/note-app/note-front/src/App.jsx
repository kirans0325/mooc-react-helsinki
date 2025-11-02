import { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import Notification from "./components/Notification";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState({ message: null, type: "" });

  // 🔹 Fetch notes from backend
  useEffect(() => {
    noteService
      .getAll()
      .then((data) => setNotes(data))
      .catch(() => showNotification("Failed to fetch notes", "error"));
  }, []);

  // 🔹 Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: "" }), 4000);
  };

  // 🔹 Add note
  const addNote = (noteContent) => {
    if (noteContent.trim() === "") {
      showNotification("Note cannot be empty", "error");
      return;
    }

    const noteObject = { content: noteContent, important: Math.random() > 0.5 };

    noteService
      .create(noteObject)
      .then((createdNote) => {
        setNotes(notes.concat(createdNote));
        showNotification("Note added successfully!");
      })
      .catch(() => showNotification("Failed to add note", "error"));
  };

  // 🔹 Toggle importance
  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) {
    console.error("Note not found for id:", id);
    return;
  }
  console.log("Toggling note:", note);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then((returnedNote) => {
        console.log("Updated:", returnedNote);
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
        showNotification(
          `Marked as ${returnedNote.important ? "important" : "not important"}`
        );
      })
      .catch(() => showNotification("Failed to update note", "error"));
  };

  // 🔹 Notes to display
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification.message} type={notification.type} />

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>

      <NoteList notes={notesToShow} toggleImportance={toggleImportance} />
      <NoteForm onAddNote={addNote} />
    </div>
  );
};

export default App;
