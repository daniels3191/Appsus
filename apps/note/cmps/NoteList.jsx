import { NotePreview } from "./NotePreview.jsx";

export function NoteList({notes,onRemoveNote}) {

    

    return <section className="notes-list">
        <ul className="">
            {notes.map(note => <li key={note.id}>
                <NotePreview note={note} />
                <button onClick={() => onRemoveNote(note.id)}>x</button>

            </li> )}
        </ul>
    </section>
}
