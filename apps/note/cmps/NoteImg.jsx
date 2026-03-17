
export function NoteImg({ info }) {

    const { title, txt, url } = info    

    return <article className="note-priview" >
        <p> {title}</p>
        <p> {txt}</p>
        <img src={url} alt="" />
    </article>
}