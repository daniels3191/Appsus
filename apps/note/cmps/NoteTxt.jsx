export function  NoteTxt({ info }){

    const { title, txt } = info

    return <article className="note-priview" >
        <p className="title-for-note">{title}</p>
        <p className="txt-for-note">{txt}</p>
    </article>

}

