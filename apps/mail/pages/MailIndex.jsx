// • Gets mails to show from service
// • Renders the list and the filter components (both top filter with search,
// and side filter for different folders)
const { useState, useEffect } = React
const { Link, useSearchParams, useParams } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailDetails } from "./MailDetails.jsx"

import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

export function MailIndex({ setActiveApp }) {
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

  function onToggleRead(mail) {
    const updatedMail = { ...mail, isRead: !mail.isRead }
    mailService.save(updatedMail).then(loadMails)
  }

  function onRead(mail) {
    const updatedMail = { ...mail, isRead: true }
    mailService.save(updatedMail).then(loadMails)
  }

  function onRemoveMail(mail, mailId) {
    const mailToRemove = mails.find((mail) => mail.id === mailId)

    if (mailToRemove.removedAt) {
      mailService
        .remove(mailId)
        .then(() => {
          setMails((prev) => prev.filter((mail) => mail.id !== mailId))
          showSuccessMsg("Mail Removed.")
        })
        .catch((err) => showErrorMsg(`Couldn't remove ${mailId}`))
    } else {
      const trashedMail = { ...mail, removedAt: new Date() }

      mailService
        .save(trashedMail)
        .then(() => {
          loadMails()
          showSuccessMsg("Mail Moved to Trash")
        })
        .catch((err) => showErrorMsg(`Couldn't move to trash`))
    }
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

  useEffect(() => {
    setActiveApp("mail")
    return () => setActiveApp(null)
  }, [])

  const params = useParams()

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
        {params.id ? (
          <MailDetails onRemoveMail={onRemoveMail} mailId={params.id} />
        ) : (
          <React.Fragment>
            <MailFilter
              filterBy={filterBy}
              onSetFilterBy={setFilterBy}
              onClearFilter={onClearFilter}
            />

            <MailList
              mails={mails}
              onToggleRead={onToggleRead}
              onStar={onStar}
              onRemoveMail={onRemoveMail}
              onRead={onRead}
            />
          </React.Fragment>
        )}
      </div>
    </section>
  )
}
