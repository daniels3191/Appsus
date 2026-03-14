export function NotePreview({ note }) {
    console.log(note.isPinned);
    

    return <article className="note-priview" >
        <p> {note.info.title}</p>
        <p>{note.info.txt}</p>
    </article>


}