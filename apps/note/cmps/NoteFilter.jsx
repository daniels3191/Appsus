const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { SearchIcon } from '../svgs/SearchIcon.jsx'
import { XIcon } from '../svgs/XIcon.jsx'

export function NoteFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isNoteTypePickerOpen, setIsNoteTypePickerOpen] = useState(false)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { type, name, value } = target
        console.log(value);

        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function handleTypeChange(value) {
        setFilterByToEdit(prev => ({ ...prev, type: value }))
        setIsNoteTypePickerOpen(prev => !prev)

    }

    function onClear() {
        setFilterByToEdit(noteService.getDefaultFilter())
        setIsNoteTypePickerOpen(false)
    }
    function onSearch() {
        setIsNoteTypePickerOpen(prev => !prev)
        console.log('search');
    }

    return (
        <div className="note-filter">
            {/* <button className="btn-search" onClick={onSearch}>
                <SearchIcon />
            </button> */}
            <button className="icon-btn btn-search" type="button" onClick={onSearch}>
                <span className="material-symbols-outlined">filter_list</span>
            </button>
            <input type="text"
                value={filterByToEdit.txt}
                onChange={ev => handleChange(ev)}
                name="txt"
                placeholder="Search"
            />

            <button className="btn-clear" onClick={onClear}>
                <XIcon />
            </button>

            {isNoteTypePickerOpen && (
                <div className="note-type-picker-modal">
                    <button className="icon-btn" type="button" onClick={() => (handleTypeChange('')
                    )}>
                        <span className="material-symbols-outlined">select_all</span>
                    </button>
                    <button className="icon-btn" type="button" onClick={() => (handleTypeChange('NoteTxt')
                    )}>
                        <span className="material-symbols-outlined">text_fields</span>
                    </button>
                    <button className="icon-btn" type="button" onClick={() => (handleTypeChange('NoteImg')
                    )}>
                        <span className="material-symbols-outlined">image</span>
                    </button>
                    <button className="icon-btn" type="button" onClick={() => (handleTypeChange('NoteTodos')
                    )}>
                        <span className="material-symbols-outlined">check_box</span>
                    </button>

                </div>
            )}
        </div>




    )


}
