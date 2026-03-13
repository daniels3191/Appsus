const { NavLink, useSearchParams } = ReactRouterDOM
export function MailFolderList() {
  const [searchParams] = useSearchParams()
  const currentStatus = searchParams.get("status")

  function getLinkClass(status) {
    return currentStatus === status ? "active" : ""
  }
  return (
    <section className="mail-folder-list">
      <nav>
        <NavLink
          className={() => getLinkClass("inbox")}
          to="/mail?status=inbox"
        >
          <span className="material-symbols-outlined">inbox</span> Inbox
        </NavLink>
        <NavLink className={() => getLinkClass("sent")} to="/mail?status=sent">
          <span className="material-symbols-outlined">send</span>
          Sent
        </NavLink>
        <NavLink
          className={() => getLinkClass("trash")}
          to="/mail?status=trash"
        >
          <span className="material-symbols-outlined">delete</span>
          Trash
        </NavLink>
        <NavLink
          className={() => getLinkClass("draft")}
          to="/mail?status=draft"
        >
          <span className="material-symbols-outlined">draft</span>
          Draft
        </NavLink>
      </nav>
    </section>
  )
}
