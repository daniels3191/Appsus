// • Gets mails to show from service
// • Renders the list and the filter components (both top filter with search,
// and side filter for different folders)
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"

export function MailIndex() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams),
  )

  function loadMails() {
    mailService.query(filterBy).then(setMails)
  }

  function onClearFilter() {
    setFilterBy({ ...mailService.getDefaultFilter(), status: filterBy.status })
  }

  function onStar(mail) {
    const updatedMail = { ...mail, isStarred: !mail.isStarred }
    mailService.save(updatedMail).then(loadMails)
  }

  function onToggleMenu() {
    setIsMenuOpen((prev) => !prev)
  }
  useEffect(() => {
    setFilterBy(mailService.getFilterFromSearchParams(searchParams))
  }, [searchParams])

  useEffect(() => {
    loadMails()
    setSearchParams(utilService.trimObj(filterBy))
  }, [filterBy])

  if (!mails) {
    return (
      <div className="loader">
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <section className={`container ${isMenuOpen ? "" : "menu-closed"}`}>
      <MailHeader
        filterBy={filterBy}
        onSetFilterBy={setFilterBy}
        onToggleMenu={onToggleMenu}
      />
      <div className="mail-menu">
        <MailCompose onMailSent={loadMails} />
        <MailFolderList />
      </div>
      <div className="mail-content">
        <MailFilter
          filterBy={filterBy}
          onSetFilterBy={setFilterBy}
          onClearFilter={onClearFilter}
        />
        <MailList mails={mails} onStar={onStar} />
      </div>
    </section>
  )
}
