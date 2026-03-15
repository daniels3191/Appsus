
export function NoteImg({ info }) {

    const { title, url } = info

    return <article className="note-priview" >
        <p> {title}</p>
        <img src={url} alt="" />
    </article>
}