const { NavLink, Link } = ReactRouterDOM
export function MailFolderList() {
  return (
    <nav>
      <Link to="/mail?status=inbox">
        <div className="logo">
          <img src="/apps/mail/icons/logo.svg" alt="" />
          <span>Gmail</span>
        </div>
      </Link>
      <NavLink to="/mail?status=inbox">Inbox</NavLink>
      <NavLink to="/mail?status=sent">Sent</NavLink>
      <NavLink to="/mail?status=trash">Trash</NavLink>
      <NavLink to="/mail?status=draft">Draft</NavLink>
    </nav>
  )
}
