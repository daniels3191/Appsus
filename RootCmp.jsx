const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
const { useState } = React

export function RootCmp() {
  const [activeApp, setActiveApp] = useState(null)
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader activeApp={activeApp}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex setActiveApp={setActiveApp} />} />
          <Route path="/mail/:id" element={<MailIndex setActiveApp={setActiveApp}/>} />
          <Route path="/note" element={<NoteIndex setActiveApp={setActiveApp}/>} />
          <Route path="/note/:id" element={<NoteIndex setActiveApp={setActiveApp}/>} />
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
