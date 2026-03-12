const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParms(searchParams))
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    
    

    useEffect(() => {
        loadNotes()
        // setSearchParams(utilService.trimObj())
    }, [filterBy])

    function loadNotes() {

        return noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }

    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                console.log(`The note ${noteId} was removed`);

            }).catch(() => {
                console.log(`Cant remove the note ${noteId}`);

            })
    }
    

    if (!notes) {
        return <div className="loader">
            <img src="./assets/img/loader.svg" alt="" />
        </div>
    }

    return <section className="notes-index index-main-layout">
        <NoteHeader
            filterBy={filterBy}
            setFilterBy={setFilterBy}
        />
        <div className="nav-bar">nav</div>
        <div className="note-main">
            <NoteEdit loadNotes={loadNotes} />
            <NoteList notes={notes} onRemoveNote={removeNote} />
        </div>
    </section>
}
