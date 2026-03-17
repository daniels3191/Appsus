const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'

export function AddNoteTxt({ note, handleChange, setIsFullNoteEditor, IsFullNoteEditor, onSaveNote, onCloseEdit }) {
    return (
        <div className="note-edit-container" style={note.style}>
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
                <button className="icon-btn" type="submit" form="note-edit-form">
                    <span className="material-symbols-outlined">check</span>
                </button>
                <Link to={'/note/'}>
                    <button className="icon-btn" type="button" onClick={onCloseEdit}>
                        <span className="material-symbols-outlined">cancel</span>
                    </button>
                </Link>
                <input value={utilService.normalizeHex(note.style.backgroundColor)} type="color" id="backgroundColor" name="backgroundColor"
                    className="backgroundcolor-input" onChange={handleChange} />
                <label htmlFor="backgroundColor" className="icon-btn">
                    <span className="material-symbols-outlined">palette</span>
                </label>
            </div>
        </div>)
}