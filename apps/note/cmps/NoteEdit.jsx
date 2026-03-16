const { useState, useEffect } = React
const { useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { AddNoteTxt } from "./AddNoteTxt.jsx"
import { AddNoteImg } from "./AddNoteImg.jsx"
import { XIcon } from '../svgs/XIcon.jsx'

export function NoteEdit({ loadNotes, IsFullNoteEditor, setIsFullNoteEditor }) {

    const [note, setNote] = useState(noteService.getEmptyNote())
    // const [isEditMode, setIsEditMode] = useState(false)
    const [noteType, setNoteType] = useState('TakeANote')

    const params = useParams()

    console.log(noteType);

    useEffect(() => {
        if (params.id) {
            noteService.get(params.id)
                .then((note) => {
                    setNote(note)
                    // setIsEditMode(true)
                })
        }
    }, [params.id])


    function handleChange({ target }) {
        const { name, value } = target

        if (name === 'backgroundColor') {
            setNote(prev => ({
                ...prev,
                style: {
                    ...prev.style,
                    backgroundColor: value
                }
            }))
        } else {
            setNote(prev => ({
                ...prev,
                info: {
                    ...prev.info,
                    [name]: value
                }
            }))
        }
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
        // setIsEditMode(false)
        setNoteType('TakeANote')
    }

    function handleChangeUploadImg(ev) {
        const file = ev.target.files && ev.target.files[0]
        if (!file) return;

        const url = URL.createObjectURL(file);
        setNote(prev => ({
            ...prev,
            type: 'NoteImg',
            info: {
                ...prev.info,
                url
            }
        }))
    }

    function onSetNoteType(noteType) {
        setNoteType(noteType)
        setNote(prev => ({
            ...prev,
            type: noteType === 'AddNoteImg' ? 'NoteImg' : 'NoteTxt'
        }))
    }


    return (

        <DynamicNoteAddingByType
            note={note}
            cmpType={noteType}
            handleChange={handleChange}
            setIsFullNoteEditor={setIsFullNoteEditor}
            IsFullNoteEditor={IsFullNoteEditor}
            onSaveNote={onSaveNote}
            onCloseEdit={onCloseEdit}
            handleChangeUploadImg={handleChangeUploadImg}
            onSetNoteType={onSetNoteType}
        />
    )
}

function DynamicNoteAddingByType(props) {

    const cmpMap = {
        TakeANote: <TakeANote {...props} />,
        AddNoteImg: <AddNoteImg {...props} />,
        AddNoteTxt: <AddNoteTxt {...props} />,
        AddNoteTodos: <AddNoteTodos {...props} />,
    }

    return cmpMap[props.cmpType]
}



function TakeANote({ note, handleChange, onSaveNote, handleChangeUploadImg, onSetNoteType }) {

    return (
        <div className="note-edit-container" style={note.style} >
            <form className="note-edit-form" id="note-edit-form" onSubmit={onSaveNote} >
                <textarea type="text"
                    placeholder="Take a note..."
                    id="title"
                    name="title"
                    value={note.info.title || ''}
                    onChange={handleChange}
                    rows="1"
                    onClick={() => onSetNoteType('AddNoteTxt')} />
            </form>
            <div>
                <button type="button" onClick={() => (onSetNoteType('AddNoteTxt'))}>Txt</button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(ev) => {
                        handleChangeUploadImg(ev)
                        onSetNoteType('AddNoteImg')
                    }} />
                <button onClick={() => (onSetNoteType('AddNoteTodos'))}>Todo</button>
            </div>
        </div>
    )
}

