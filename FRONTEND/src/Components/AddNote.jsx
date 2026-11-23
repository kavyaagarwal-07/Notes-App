import React from "react";
import { useState, useEffect } from "react";
import "./AddNote.css";

const AddNote = ( {isOpen, onSave, onClose, editingNote} ) => {
    const[formData, setFormData] = useState({ title: "", description: "", isPinned: false});

    function changeHandler (event) {
        const {name, value, type, checked} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked: value 
        }));
    }

    useEffect(() => {
        if(editingNote) {
            setFormData( {
                title: editingNote.title,
                description: editingNote.description,
                isPinned: editingNote.isPinned
            })
        } else {
            setFormData({
                title: "",
                description: "",
                isPinned: false
            })
        }
    }, [editingNote, isOpen]);

    const submitHandler = (event) => {
        event.preventDefault();

        console.log("Form submitted!");
        console.log(formData);

        onSave(formData);
    };

    if(!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="note-modal">

                <h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>

                <form onSubmit={submitHandler}>

                    <label htmlFor="title"> Title </label>
                    <input 
                      type="text" 
                      name = "title"
                      id = "title"
                      value = {formData.title}
                      onChange={changeHandler}
                      required
                    />

                    <label htmlFor="description"> Description </label>
                    <textarea 
                      placeholder="Write Your Thoughts Here"
                      type="text" 
                      id = "description"
                      name = "description"
                      value = {formData.description}
                      onChange={changeHandler}
                      required
                      rows = "5"
                    />

                    <div className="pin-option">
                        <label htmlFor="isPinned"> Pin This Note </label>
                        <input 
                          type="checkbox" 
                          id = "isPinned"
                          name = "isPinned"
                          checked = {formData.isPinned}
                          onChange={changeHandler}
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="save-btn">
                            {editingNote ? "Update Note" : "Save Note"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
} 

export default AddNote;