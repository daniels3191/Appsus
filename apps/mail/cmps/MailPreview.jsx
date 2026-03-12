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
        <button className="action">
          <span title="Delete" className="action material-symbols-outlined">
            delete
          </span>
        </button>
        <button className="action">
          {mail.isRead ? (
            <span
              title="Mark as unread"
              className="action material-symbols-outlined"
            >
              mark_email_unread
            </span>
          ) : (
            <span className="action material-symbols-outlined">
              mark_email_read
            </span>
          )}
        </button>
        <span className="action material-symbols-outlined">archive</span>
      </div>
    </section>
  )
}
