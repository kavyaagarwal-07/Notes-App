import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isPinned: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const Notes = mongoose.model("Notes", NoteSchema);
export default Notes;