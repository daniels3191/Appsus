const { Link, NavLink } = ReactRouterDOM
import { MailHeader } from "../apps/mail/cmps/MailHeader.jsx"
import { NoteHeader } from "../apps/note/cmps/NoteHeader.jsx"
export function AppHeader({ activeApp }) {
//   if (activeApp === "mail") return <MailHeader />
//   if (activeApp === "note") return <NoteHeader />
  return (
    <header className="app-header">
      <Link to="/">
        <h3>LOGO ✨</h3>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
    </header>
  )
}
