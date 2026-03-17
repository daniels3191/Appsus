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
    onAddTodoListItem,
    onChangeInfo
}) {
    const todos = note.info.todos || []


        function handleCheckboxChange(idx) {
            console.log(note.info);
            
        const updatedTodos = todos.map((todo, currIdx) =>
            currIdx === idx ? { ...todo, isDone: !todo.isDone } : todo)
        // onChangeInfo({ ...note.info, todos: updatedTodos })
        onChangeInfo(updatedTodos)
    }

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
                                    // readOnly
                                     onChange={() => handleCheckboxChange(idx)}
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
                <button className="icon-btn" type="submit" form="note-edit-form">
                    <span className="material-symbols-outlined">check</span>
                </button>
                <Link to={'/note/'}>
                    <button className="icon-btn" type="button" onClick={onCloseEdit}>
                        <span className="material-symbols-outlined">cancel</span>
                    </button>
                </Link>
                <input value={utilService.normalizeHex(note.style.backgroundColor)} type="color" id="backgroundColor" name="backgroundColor"
                    className="backgroundcolor-input" onChange={handleChange} />
                <label htmlFor="backgroundColor" className="icon-btn">
                    <span className="material-symbols-outlined">palette</span>
                </label>
            </div>
        </div>
    )
}

export function NoteTodos({ info, onChangeInfo }) {
    const { title, todos } = info

    function handleCheckboxChange(idx) {
        const updatedTodos = todos.map((todo, currIdx) =>
            currIdx === idx ? { ...todo, isDone: !todo.isDone } : todo)

        onChangeInfo({ ...info, todos: updatedTodos })
    }

    return <article className="note-priview" >
        <p> {title}</p>
        <ul className="todo-container">
            {todos.map((todo, idx) => {
                const id = `${todo.txt}-${idx}`

                return (
                    <li key={id}>
                        <input
                            type="checkbox"
                            id={id}
                            checked={todo.isDone}
                            onChange={() => handleCheckboxChange(idx)}
                        />
                        <label htmlFor={id}>{todo.txt}</label>
                    </li>
                )
            })}
        </ul>
    </article>
}