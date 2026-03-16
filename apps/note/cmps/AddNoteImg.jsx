const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'

export function AddNoteImg({ note, handleChange, setIsFullNoteEditor, IsFullNoteEditor, onSaveNote, onCloseEdit }) {
    return (
        <div className="note-edit-container" style={note.style}>
               {note.info.url && (
                <div className="img-container">
                    <img src={note.info.url} alt="Uploaded preview" />
                </div>

                )}
            <form className="note-edit-form" id="note-edit-form" onSubmit={onSaveNote} >
                <textarea type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                    value={note.info.title || ''}
                    onChange={handleChange}
                    rows="1"
                    onClick={!IsFullNoteEditor ? () => setIsFullNoteEditor(!IsFullNoteEditor) : () => ''} />
                <textarea type="text"
                    placeholder="Take a note..."
                    id="txt"
                    name="txt"
                    value={note.info.txt || ''}
                    onChange={handleChange}
                    rows="1" />
            </form>

            <div className="action-container">
                <button type="submit" form="note-edit-form">Save</button>
                <Link to={'/note/'}>
                    <button type="button" onClick={onCloseEdit}>Close</button>
                </Link>
                <input value={utilService.normalizeHex(note.style.backgroundColor)} type="color" id="backgroundColor" name="backgroundColor"
                    className="backgroundcolor-input" onChange={handleChange} />
            </div>
        </div>
    )
}