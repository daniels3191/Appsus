const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailComposeModal({ toggleIsOpen, onMailSent }) {
  const [mail, setMail] = useState(mailService.getEmptyMail())

  useEffect(() => {
    const interval = setInterval(() => {
      setMail((currMail) => {
        mailService.save(currMail).then((savedMail) => {
          setMail(savedMail)
          onMailSent() // updating mails
        })
        return currMail
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  function handleChange({ target }) {
    const { name, value } = target
    setMail((prev) => ({ ...prev, [name]: value }))
  }

  function onSendMail(ev) {
    ev.preventDefault()
    const mailToSend = { ...mail, isDraft: false, }
    mailService.save(mailToSend).then(() => {
      toggleIsOpen()
      onMailSent()
    })
  }
  return (
    <div className="mail-compose-modal">
      <div className="compose-modal-header">
        <span>New Message </span>
        <button className="compose-modal-btn close-btn" onClick={toggleIsOpen}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <input
        name="to"
        placeholder="Recipients"
        value={mail.to}
        onChange={handleChange}
      />
      <input
        name="subject"
        placeholder="Subject"
        value={mail.subject}
        onChange={handleChange}
      />
      <textarea name="body" value={mail.body} onChange={handleChange} />
      <div className="compose-modal-footer">
        <button className="compose-modal-btn send-btn" onClick={onSendMail}>
          Send
        </button>
      </div>
    </div>
  )
}
