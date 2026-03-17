const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({
    notes,
    onRemoveNote,
    togglePinning,
    onCopyNote,
    IsFullNoteEditor,
    setIsFullNoteEditor,
    onUpdateNote
}) {

    return <section className="notes-list-container">
        <ul className="">
            {notes.map(note => (
                <li className="note-container" key={note.id} style={note.style}>
                    <NotePreview
                        note={note}
                        onUpdateNote={onUpdateNote} />
                    <div className="action-container">
                        <button className="icon-btn" onClick={() => onRemoveNote(note.id)}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                        <Link to={`/note/${note.id}`} >
                            <button
                                className='icon-btn btn-note-edit'
                                onClick={!IsFullNoteEditor ? () => setIsFullNoteEditor(!IsFullNoteEditor) : () => ''}>
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                        </Link>
                        <button className="icon-btn" onClick={() => onCopyNote(note)}>
                            <span className="material-symbols-outlined">copy_all</span>
                        </button>
                        <button className="icon-btn pin-btn" onClick={() => togglePinning(note)}>
                            <span className={`material-symbols-outlined ${note.isPinned ? 'filled' : ''}`}>
                                push_pin
                            </span>
                        </button>
                    </div>
                </li>))}
        </ul>
    </section>
}
