
import React from "react";
import "./NoteCard.css";

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
    return (
        <div className="note-card">

            {/* Card Header */}
            <div className="note-card-header">
                <span className="note-date">
                    {new Date(note.createdAt).toLocaleDateString()}
                </span>

                <button
                    className={`pin-btn ${note.isPinned ? "pinned" : ""}`}
                    onClick={() => onTogglePin(note)}
                    title="Pin note"
                >
                    📌
                </button>
            </div>

            {/* Note Content */}
            <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
            </div>

            {/* Card Actions */}
            <div className="note-card-actions">

                <button onClick={() => onEdit(note)}>
                    ✏️ Edit
                </button>

                <button onClick={() => onDelete(note._id)}>
                    🗑️ Delete
                </button>

            </div>

        </div>
    );
};

export default NoteCard;
