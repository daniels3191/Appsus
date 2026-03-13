export function NotePreview({ note }) {

    return <article className="note-priview" style={note.style}>
        <p> {note.info.title}</p>
        <p>{note.info.txt}</p>
    </article>


}