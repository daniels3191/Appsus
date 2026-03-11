const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'

export function NoteEdit({ loadNotes }) {

    const [note, setNote] = useState(noteService.getEmptyNote())


    function handleChange({ target }) {
        const { type, name, value } = target
        console.log(name, value);


        setNote(prev => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: type === 'text' ? value : +value
            }
        }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(note)
            .then(note => {

                console.log(`Note ${note.id} has been saved`);
                loadNotes()
                setNote(noteService.getEmptyNote())
            })
            .catch(err => showErrorMsg(`Couldn't save ${note.id}`))
    }


    return <form className="note-edit" onSubmit={onSaveNote}>
        <input type="text"
            placeholder="Title"
            id="title"
            name="title"
            value={note.info.title}
            onChange={handleChange} />

        <input type="text"
            placeholder="Take a note..."
            id="txt"
            name="txt"
            value={note.info.txt}
            onChange={handleChange} />

        <button>save</button>
    </form>




}