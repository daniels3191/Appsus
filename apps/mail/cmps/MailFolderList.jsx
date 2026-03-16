const { NavLink, useSearchParams } = ReactRouterDOM
export function MailFolderList({ unreadCount }) {
  const [searchParams] = useSearchParams()
  const currentStatus = searchParams.get("status")

  function getLinkClass(status) {
    return currentStatus === status ? "active" : ""
  }
  return (
    <section className="mail-folder-list">
      <nav>
        <NavLink
          className={() => `folder-list-inbox ${getLinkClass("inbox")}`}
          to="/mail?status=inbox"
        >
          <span className="material-symbols-outlined">inbox</span> Inbox{" "}
          <span className="unread-count">
            {currentStatus === "inbox" ? unreadCount || "" : ""}
          </span>
        </NavLink>
        <NavLink className={() => getLinkClass("sent")} to="/mail?status=sent">
          <span className="material-symbols-outlined">send</span>
          Sent
          <span className="unread-count">
            {currentStatus === "sent" ? unreadCount || "" : ""}
          </span>
        </NavLink>
        <NavLink
          className={() => getLinkClass("trash")}
          to="/mail?status=trash"
        >
          <span className="material-symbols-outlined">delete</span>
          Trash
          <span className="unread-count">
            {currentStatus === "trash" ? unreadCount || "" : ""}
          </span>
        </NavLink>
        <NavLink
          className={() => getLinkClass("draft")}
          to="/mail?status=draft"
        >
          <span className="material-symbols-outlined">draft</span>
          Draft
          <span className="unread-count">
            {currentStatus === "draft" ? unreadCount || "" : ""}
          </span>
        </NavLink>
      </nav>
    </section>
  )
}
