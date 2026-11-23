import express from "express";
import Notes from "../Model/NoteSchema.js";

const router = express.Router();

// POST - Create a new note
router.post("/notes", async (req, res) => {
    try {
        const { title, description, isPinned } = req.body;

        const newNote = await Notes.create({
            title,
            description,
            isPinned
        });

        res.status(201).json({
            message: "Note created successfully",
            data: newNote
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create note",
            error: error.message
        });
    }
});

// GET - Retrieve all notes
router.get("/notes", async (req, res) => {
    try {
        const data = await Notes.find();

        res.status(200).json({
            message: "Data retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve notes",
            error: error.message
        });
    }
});

// PUT - Update a note
router.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isPinned } = req.body;

        const updatedNote = await Notes.findByIdAndUpdate(
            id,
            { title, description, isPinned },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            data: updatedNote
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update note",
            error: error.message
        });
    }
});

// DELETE - Delete a note
router.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Notes.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            data: deletedNote
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete note",
            error: error.message
        });
    }
});

export default router;
