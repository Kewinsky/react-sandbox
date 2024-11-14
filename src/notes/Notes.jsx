import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: uuidv4(), value: "hello", isEditing: false },
    { id: uuidv4(), value: "world", isEditing: false },
  ]);

  const handleAddNote = () => {
    const newNote = { id: uuidv4(), value: "New note", isEditing: false };
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (idToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);

    setNotes(updatedNotes);
  };

  const handleSaveNote = (idToSave, newContent) => {
    const updatedNotes = notes.map((note) =>
      note.id === idToSave
        ? { ...note, value: newContent, isEditing: false }
        : note
    );

    setNotes(updatedNotes);
  };

  const handleEditNote = (idToEdit) => {
    const updatedNotes = notes.map((note) =>
      note.id === idToEdit ? { ...note, isEditing: true } : note
    );

    setNotes(updatedNotes);
  };

  return (
    <div className="notes-board">
      <button onClick={handleAddNote} className="notes-addBtn">
        Add note
      </button>
      <div className="notes-grid-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleEditNote={handleEditNote}
            handleSaveNote={handleSaveNote}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

const Note = ({ note, handleEditNote, handleSaveNote, handleDeleteNote }) => {
  const [editContent, setEditContent] = useState(note.value);

  return (
    <div className="notes-note">
      <div className="notes-buttons">
        {note.isEditing ? (
          <button onClick={() => handleSaveNote(note.id, editContent)}>
            Save
          </button>
        ) : (
          <button onClick={() => handleEditNote(note.id)}>Edit</button>
        )}

        <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
      </div>
      {note.isEditing ? (
        <textarea
          className="notes-textarea"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <textarea
          className="notes-textarea"
          value={note.value}
          disabled
        ></textarea>
      )}
    </div>
  );
};

export default Notes;
