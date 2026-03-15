const { useState, useEffect } = React
const { useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'

export function NoteEdit({ loadNotes, IsFullNoteEditor, setIsFullNoteEditor }) {

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
                [name]: type === 'textarea' ? value : +value
            },
            style: {
                ...prev.style,
                [name]: value
            }
        }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(note)
            .then(note => {
                loadNotes()
                onCloseEdit()
            })
            .catch(err => showErrorMsg(`Couldn't save ${note.id}`))
    }

    function onCloseEdit() {
        setNote(noteService.getEmptyNote())
        setIsFullNoteEditor(!IsFullNoteEditor)
    }
    console.log(IsFullNoteEditor);
    

    return <div className="note-edit-container" style={note.style}>
        <form className="note-edit-form" id="note-edit-form" onSubmit={onSaveNote} >
            <textarea type="text"
                placeholder={IsFullNoteEditor ? "Title" : "Take a note..."}
                id="title"
                name="title"
                value={note.info.title}
                onChange={handleChange}
                rows="1"
                onClick={!IsFullNoteEditor ? () => setIsFullNoteEditor(!IsFullNoteEditor) : () => ''} />
            {IsFullNoteEditor &&
                <textarea type="text"
                    placeholder="Take a note..."
                    id="txt"
                    name="txt"
                    value={note.info.txt}
                    onChange={handleChange}
                    rows="1" />
            }
        </form>

        {IsFullNoteEditor &&
            <div className="action-container">
                <button type="submit" form="note-edit-form">Save</button>
                <Link to={'/note/'}>
                    <button type="button" onClick={onCloseEdit}>Close</button>
                </Link>
                <input value={utilService.normalizeHex(note.style.backgroundColor)} type="color" id="backgroundColor" name="backgroundColor"
                    className="backgroundcolor-input" onChange={handleChange} />
            </div>
        }

    </div>
}