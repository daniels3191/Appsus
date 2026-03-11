// • Allow filtering
// • Start with Search and Read / Unread

const { useState, useEffect } = React
export function MailFilter({ filterBy, onSetFilterBy, onClearFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  // Update mailIndex filterBy state from filterByToEdit
  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  // For filter clear button , updates after clear button is pressed to match filterby after clear.
  useEffect(() => {
    setFilterByToEdit(filterBy)
  }, [filterBy])

  function handleChange(ev) {
    const { value, name, type, checked } = ev.target
    // console.log({ value, name, type, checked })

    setFilterByToEdit((prev) => ({
      ...prev,
      [name]: type === "search" ? value : checked,
    }))
  }

  return (
    <section className="mail-filter">
      <input
        onChange={(ev) => handleChange(ev)}
        value={filterByToEdit.txt}
        type="search"
        name="txt"
        placeholder="Search Mail"
      />
      <label htmlFor="isRead">isRead</label>
      <input
        onChange={(ev) => handleChange(ev)}
        checked={filterByToEdit.isRead}
        type="checkbox"
        name="isRead"
        id="isRead"
      />
      <label htmlFor="isStarred">isStarred</label>
      <input
        onChange={(ev) => handleChange(ev)}
        checked={filterByToEdit.isStarred}
        type="checkbox"
        name="isStarred"
        id="isStarred"
      />
      <button onClick={onClearFilter}>Clear</button>
    </section>
  )
}
