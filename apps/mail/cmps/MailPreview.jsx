// • Present a mail preview
// • Renders the subject (with text size limit)
// • Gives visual indication for read/unread
// • Support hover state
const { Link } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onStar, onRead, onRemoveMail }) {
  return (
    <section className={`mail-preview ${!mail.isRead ? "" : "unread"}`}>
      <button className="action mail-star" onClick={() => onStar(mail)}>
        {mail.isStarred ? (
          <i
            className="fa-solid fa-star"
            style={{ color: "rgb(255, 212, 59)" }}
          ></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </button>

      <span className={`mail-title ${!mail.isRead ? "font-bold" : ""}`}>
        {mail.subject}
      </span>
      <span className="mail-body">{mail.body}</span>
      <span className={`mail-date ${!mail.isRead ? "font-bold" : ""}`}>
        {utilService.formatDate(mail.sentAt)}
      </span>

      <div className="mail-actions">
        <button
          title="Delete"
          className="action"
          onClick={() => onRemoveMail(mail, mail.id)}
        >
          <span title="Delete" className="material-symbols-outlined">
            delete
          </span>
        </button>

        {mail.isRead ? (
          <button
            title="Mark as unread"
            className="action"
            onClick={() => onRead(mail)}
          >
            <span className="material-symbols-outlined">mark_email_unread</span>
          </button>
        ) : (
          <button
            title="Mark as read"
            className="action"
            onClick={() => onRead(mail)}
          >
            <span className="material-symbols-outlined">mark_email_read</span>
          </button>
        )}

        <button title="Archive" className="action">
          <span className="material-symbols-outlined">archive</span>
        </button>
      </div>
    </section>
  )
}
