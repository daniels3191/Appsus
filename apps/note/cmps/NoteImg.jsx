
export function NoteImg({ info }) {

    const { title, txt, url } = info    

    return <article className="note-priview" >
        <p className="title-for-note"> {title}</p>
        <p className="txt-for-note"> {txt}</p>
        <img src={url} alt="" />
    </article>
}