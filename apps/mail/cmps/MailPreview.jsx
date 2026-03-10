// • Present a mail preview
// • Renders the subject (with text size limit)
// • Gives visual indication for read/unread
// • Support hover state

import { utilService } from "../../../services/util.service.jsx"

export function MailPreview({ mail }) {
  return (
    <section className="mail-preview">
      <h2>{mail.subject}</h2>
      <p>{mail.body}</p>
      <p>{utilService.formatDate(mail.sentAt)}</p>
    </section>
  )
}
