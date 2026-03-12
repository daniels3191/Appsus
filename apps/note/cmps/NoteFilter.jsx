const { useState, useEffect } = React

export function NoteFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    // useEffect(() => {

    //     setFilterBy(filterByToEdit)
    // }, [filterByToEdit])


    return <div className="note-filter">
        <input type="text"
            // value={filterByToEdit.title}
            // onChange={ev => handleChange(ev)}
            name="title"
            placeholder="Title" />
    </div>


}