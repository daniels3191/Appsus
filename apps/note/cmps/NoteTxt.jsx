export function  NoteTxt({ info }){

    const { title, txt } = info
    
    return <article className="note-priview" >
        <p> {title}</p>
        <p>{txt}</p>
    </article>

}

