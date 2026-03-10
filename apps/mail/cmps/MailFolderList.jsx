const { NavLink } = ReactRouterDOM

export function MailFolderList() {
  return (
    <nav>
      <NavLink to="/mail?status=inbox">Inbox</NavLink>
      <NavLink to="/mail?status=sent">Sent</NavLink>
      <NavLink to="/mail?status=trash">Trash</NavLink>
      <NavLink to="/mail?status=draft">Draft</NavLink>
    </nav>
  )
}
