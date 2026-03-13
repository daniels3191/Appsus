const { useState, useEffect } = React
const { Link } = ReactRouterDOM
export function MailHeader({ filterBy, onSetFilterBy ,onToggleMenu }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  // Update mailIndex filterBy state from filterByToEdit
  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])
  useEffect(() => {
    setFilterByToEdit(filterBy)
  }, [filterBy])
  function handleSearch(ev) {
    const { value } = ev.target
    setFilterByToEdit((prev) => ({ ...prev, txt: value }))
  }

  return (
    <header className="mail-header">
      <button className="action" onClick={onToggleMenu}>
        <span className="mail-menu-icon material-symbols-outlined">menu</span>
      </button>
      <Link to="/mail">
        <div className="logo">
          <img src="/apps/mail/icons/logo.svg" alt="" />
          <span>Gmail</span>
        </div>
      </Link>
      <div className="mail-search">
        <span className="mail-search-icon material-symbols-outlined">search</span>
        <input
          onChange={(ev) => handleSearch(ev)}
          value={filterByToEdit.txt}
          type="search"
          name="txt"
          placeholder="Search Mail"
        />
      </div>
      <button className="action">
        <span className="mail-apps-icon material-symbols-outlined">apps</span>
      </button>
    </header>
  )
}
