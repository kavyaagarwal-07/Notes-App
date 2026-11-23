
import React from "react";
import "./NotesHeader.css";

const NotesHeader = ({ activeTab, notesCount, onAddNote }) => {
    return (
        <div className="notes-header">

            <div className="notes-heading">
                <h1>
                    {activeTab === "all" ? "My Notes" : "Pinned Notes"}
                </h1>

                <p>
                    You have {notesCount} notes to organize
                </p>
            </div>

            <button
                className="add-note-btn"
                onClick={onAddNote}
            >
                + Add New Note
            </button>

        </div>
    );
};

export default NotesHeader;
