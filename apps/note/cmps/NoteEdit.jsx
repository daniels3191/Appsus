const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'

export function NoteEdit({ loadNotes }) {

    const [note, setNote] = useState(noteService.getEmptyNote())
    const params = useParams()


    useEffect(() => {
        if (params.id) {
            noteService.get(params.id)
                .then(setNote)
        }
    }, [params.id])

    function handleChange({ target }) {
        const { type, name, value } = target

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
                clear()
            })
            .catch(err => showErrorMsg(`Couldn't save ${note.id}`))
    }

    function clear() {
        setNote(noteService.getEmptyNote())
    }


    return <div className="note-edit-container">
        <form className="note-edit-form" id="note-edit-form" onSubmit={onSaveNote}>
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
        </form>
        <div className="action-container">
            <button type="submit" form="note-edit-form">Save</button>
            <button onClick={clear}>Clear</button>
        </div>


    </div>







}