const { useState, useEffect } = React

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        
        return noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }

    function removeNote(noteId){
        noteService.remove(noteId)
        .then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            console.log(`The note ${noteId} was removed`);
            
        }).catch(() => {
            console.log(`Cant remove the note ${noteId}`);
            
        })
    }

        if (!notes) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <section className="notes-index">
        Notes app
        <NoteEdit loadNotes={loadNotes}/>
        <NoteList notes={notes} onRemoveNote={removeNote}/>
    </section>
}
