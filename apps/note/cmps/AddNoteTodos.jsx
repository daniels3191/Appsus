const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'

export function AddNoteTodos({
    note,
    handleChange,
    setIsFullNoteEditor,
    IsFullNoteEditor,
    onSaveNote,
    onCloseEdit,
    onChangeTodoTxt,
    onAddTodoListItem
}) {
    const todos = note.info.todos || []

    return (
        <div className="note-edit-container" style={note.style}>
            <form className="note-edit-form" id="note-edit-form" onSubmit={onSaveNote}>
                <textarea
                    placeholder="Title"
                    id="title"
                    name="title"
                    value={note.info.title || ''}
                    onChange={handleChange}
                    rows="1"
                    onClick={!IsFullNoteEditor ? () => setIsFullNoteEditor(!IsFullNoteEditor) : undefined}
                />

                <ul className="check-list-container">
                    {todos.map((todo, idx) => {
                        const id = `${idx}`
                        return (
                            <li key={id}>
                                <input
                                    type="checkbox"
                                    id={id}
                                    checked={todo.isDone}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={todo.txt}
                                    onChange={(ev) => onChangeTodoTxt(idx, ev.target.value)}
                                    placeholder="List item"
                                />
                            </li>
                        )
                    })}
                    <button type="button" onClick={onAddTodoListItem}>+</button>
                </ul>
            </form>

            <div className="action-container">
                <button type="submit" form="note-edit-form">Save</button>
                <Link to="/note/">
                    <button type="button" onClick={onCloseEdit}>Close</button>
                </Link>
                <input
                    value={utilService.normalizeHex(note.style.backgroundColor)}
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    className="backgroundcolor-input"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}