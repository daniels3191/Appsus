const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { NavBar } from '../cmps/NavBar.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex({setActiveApp}) {
    console.log('hi');
    

    const [notes, setNotes] = useState(null)
    // const [note, setNote] = useState(null)
    const [IsFullNoteEditor, setIsFullNoteEditor] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] =
        useState(noteService.getFilterFromSearchParms(searchParams))

    useEffect(() => {
        loadNotes()
        setSearchParams(utilService.trimObj(filterBy))
    }, [filterBy])

      useEffect(() => {
  setActiveApp('note')
  return () => setActiveApp(null)
}, [])

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

    function getFilterdPinedNotes(isPinned, notes) {
        let filteredPinedNotes = {}
        if (isPinned) {
            filteredPinedNotes = notes.filter(note => note.isPinned)
        } else {
            filteredPinedNotes = notes.filter(note => !note.isPinned)
        }
        return filteredPinedNotes
    }

    //QQ: do I need to do the new notes list rendering in a synchronic way? (without calling the service?)
    function togglePinning(note) {
        note.isPinned = !note.isPinned
        noteService.save(note)
            .then(() => {
                loadNotes()
            })
    }

    //QQ: do I need to do the new notes list rendering in a synchronic way? (without calling the service?)
    function onCopyNote(note) {
        noteService.copyNote(note)
            .then(() => {
                loadNotes()
            })
    }

    if (!notes) {
        return <div className="loader">
            <img src="./assets/img/loader.svg" alt="" />
        </div>
    }

    return (
        <section className="notes-index index-main-layout">
            <NoteHeader
                filterBy={filterBy}
                setFilterBy={setFilterBy}
            />
            <NavBar />
            <div className="note-main">
                <NoteEdit
                    loadNotes={loadNotes}
                    IsFullNoteEditor={IsFullNoteEditor}
                    setIsFullNoteEditor={setIsFullNoteEditor} />
                <div className="pinned notes-container">
                    <p>Pinned</p>
                    <NoteList
                        notes={getFilterdPinedNotes(true, notes)}
                        onRemoveNote={removeNote}
                        togglePinning={togglePinning}
                        onCopyNote={onCopyNote}
                        IsFullNoteEditor={IsFullNoteEditor}
                        setIsFullNoteEditor={setIsFullNoteEditor} />
                </div>
                <div className="unpinned notes-container">
                    <p>Others</p>
                    <NoteList
                        notes={getFilterdPinedNotes(false, notes)}
                        onRemoveNote={removeNote}
                        togglePinning={togglePinning}
                        onCopyNote={onCopyNote}
                        IsFullNoteEditor={IsFullNoteEditor}
                        setIsFullNoteEditor={setIsFullNoteEditor} />
                </div>
            </div>
        </section>
    )
}
