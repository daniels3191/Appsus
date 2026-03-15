const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { SearchIcon } from '../svgs/SearchIcon.jsx'
import { XIcon } from '../svgs/XIcon.jsx'

export function NoteFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { type, name, value } = target
        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onClear() {
        setFilterByToEdit(noteService.getDefaultFilter())
    }
    function onSearch(){
        console.log('search');
    }

    return <div className="note-filter">


        <button className="btn-search" onClick={onSearch}>
            <SearchIcon />
        </button>
        <input type="text"
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            name="txt"
            placeholder="Search" />

        <button className="btn-clear" onClick={onClear}>
            <XIcon />
        </button>

        <label htmlFor="type">Note Type:</label>
        <select id="type" name="type" type='text'
            value={filterByToEdit.type}
            onChange={ev => handleChange(ev)}>
            <option value="">All</option>
            <option value="NoteTxt">Text</option>
            <option value="NoteImg">Image</option>
            <option value="NoteVideos">Video</option>
            <option value="NoteTodos">Todos</option>
        </select>
    </div>


}