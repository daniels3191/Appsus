
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