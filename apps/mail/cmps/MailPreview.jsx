// • Present a mail preview
// • Renders the subject (with text size limit)
// • Gives visual indication for read/unread
// • Support hover state

import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onStar }) {
  return (
    <section className={`mail-preview ${!mail.isRead ? "" : "unread"}`}>
      <span className="mail-star" onClick={() => onStar(mail)}>
        {mail.isStarred ? (
          <i className="fa-solid fa-star"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
      <span className={`mail-title ${!mail.isRead ? "font-bold" : ""}`}>
        {mail.subject}
      </span>
      <span className="mail-body">{mail.body}</span>
      <span className={`mail-date ${!mail.isRead ? "font-bold" : ""}`}>
        {utilService.formatDate(mail.sentAt)}
      </span>
      
      <div className="mail-actions">
        <button className="btn-remove">
          <i title="Delete" className="fa-regular fa-trash-can"></i>
        </button>
        <span className="mail-state">
        {mail.isRead ? (
          <i title="Mark as unread" className="fa-regular fa-envelope"></i>
        ) : (
          <i title="Mark as read" className="fa-regular fa-envelope-open"></i>
        )}
      </span>
      </div>
    </section>
  )
}
