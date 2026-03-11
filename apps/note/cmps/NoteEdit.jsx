const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'

export function NoteEdit() {

    const [note, setNote] = useState(noteService.getEmptyNote())


    function handleChange({target}) {
        const { type, name, value } = target
         console.log(note);
        
        setNote(prev => ({...prev, [name]: type === 'text' ? value : +value}))

       

    }

    function onSaveNote(ev) {
        ev.preventDefault()
        console.log('saving');

    }


    return <form className="note-edit" onSubmit={onSaveNote}>
        <input type="text"
            placeholder="Title"
            id="title"
            name="title"
            value={note.info.title}
            onChange={handleChange} />
        <button>save</button>
    </form>




}