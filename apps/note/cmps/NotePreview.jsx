export function NotePreview({ note }) {

    return <article className="note-priview" >
        <p> {note.info.title}</p>
        <p>{note.info.txt}</p>
    </article>


}