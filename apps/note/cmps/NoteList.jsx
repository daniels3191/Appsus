const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({notes, onRemoveNote, togglePinning, onCopyNote}) {


    

    return <section className="notes-list-container">
        <ul className="">
            {notes.map(note => <li className="note-container" key={note.id} style={note.style}>
                <NotePreview note={note} />
                <div className="action-container">
                <button onClick={() => onRemoveNote(note.id)}>x</button>
                <Link to={`/note/${note.id}`} >
                <button className='btn-note-edit'>Edit</button>
                </Link>
                <button onClick={() => togglePinning(note)}>Tpinning</button>
                <button onClick={() => onCopyNote(note)}>Copy</button>
                </div>

            </li> )}
        </ul>
    </section>
}
