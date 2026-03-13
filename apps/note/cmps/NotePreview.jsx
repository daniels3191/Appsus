export function NotePreview({ note }) {
    console.log(note.type);
    

    return <article className="note-priview" >
        <p> {note.info.title}</p>
        <p>{note.info.txt}</p>
    </article>


}