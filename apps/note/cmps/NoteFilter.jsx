const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { XForClearButton } from '../svgs/XForClearButton.jsx'

export function NoteFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    
    useEffect(() => {

        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({target}){
        const { type, name, value } = target
        setFilterByToEdit(prev => ({...prev, txt: value}))
    }

    function onClear(){
        
        setFilterByToEdit(noteService.getDefaultFilter())

    }



    return <div className="note-filter">

        <input type="text"
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            name="txt"
            placeholder="Search" />

            <button className="btn-clear" onClick={onClear}><XForClearButton/></button>
    </div>


}