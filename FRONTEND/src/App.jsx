import React, { useState, useEffect } from "react";

import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx";
import NotesHeader from "./Components/NotesHeader.jsx";
import NoteCard from "./Components/NoteCard.jsx";
import AddNote from "./Components/AddNote.jsx";

import './App.css'

function App() {

  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes");
        const result = await res.json();

        setNotes(result.data);
      }
      catch(error) {
        console.log("Error fetching notes:", error);
      }
    }

    fetchNotes();
  }, [])

  const filteredNotes = notes.filter((note) => {
    const matchesTab =
      activeTab === "all" || note.isPinned === true;

    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
  });

  const handleAddNote = async (formData) => {
    try {
      console.log("handleAddNote executed!");
      console.log("Received data:", formData);

      console.log("Sending POST request...");
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) 
      });

      console.log("Response received:", res.status);
      const result = await res.json();

      if(res.ok) {
        setNotes((prev) => [...prev, result.data]);
        setIsModalOpen(false);
      } else {
        console.log(result.message);
      }
    }
    catch(error) {
      console.log("Error adding note:", error);
    }
  }

  const handleEditNote = async (formData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${editingNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if(res.ok) {
        setNotes((prev) => 
          prev.map((note) => 
            note._id === editingNote._id ? result.data : note
          )
        );

        setIsModalOpen(false);
        setEditingNote(null);
      } else {
        console.log(result.message);
      }
    }
    catch(error) {
      console.log("Error updating note:", error);
    }
  }

  const handleSaveNote = (formData) => {
      if (editingNote) {
          handleEditNote(formData);
      } else {
          handleAddNote(formData);
      }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if(res.ok) {
        setNotes((prev) => 
          prev.filter((note) => note._id !== id)
        )
      } else {
        console.log(result.message)
      }
    }
    catch(error) {
      console.log("Error deleting note:", error);
    }
  }

  const handleTogglePin = async (note) => {
    try {
      const updatedNote = {
        title: note.title,
        description: note.description,
        isPinned: !note.isPinned
      }

      const res = await fetch(`http://localhost:3000/api/notes/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedNote)
      });

      const result = await res.json();
      if(res.ok) {
        setNotes((prev) => 
          prev.map(
            (item) => item._id === note._id ? result.data : item
          )
        );
      } else {
        console.log(result.message);
      }
    }
    catch(error) {
      console.log("Failed to Pin the Note", error);
    }
  }

  return (
    <div className="app-container">

        <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />

        <main className="main-content">

            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="notes-container">

                <NotesHeader
                    activeTab={activeTab}
                    notesCount={filteredNotes.length}
                    onAddNote={() => setIsModalOpen(true)}
                />

                <div className="notes-grid">
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onEdit={(note) => {
                                setEditingNote(note);
                                setIsModalOpen(true);
                            }}
                            onDelete={handleDeleteNote}
                            onTogglePin={handleTogglePin}
                        />
                    ))}
                </div>

            </div>
        </main>

        <AddNote
          isOpen = {isModalOpen}
          onSave = {handleSaveNote}
          onClose = {() => {
            setIsModalOpen(false)
            setEditingNote(null);
          }}
          editingNote = {editingNote}
        />
    </div>
  );
}

export default App
