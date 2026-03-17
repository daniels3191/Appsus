// • Present a mail preview - V
// • Renders the subject (with text size limit) - V
// • Gives visual indication for read/unread - V
// • Support hover state - V

// Removed the archive button since I didn't work on its functionality.

const { Link } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js"

export function MailPreview({
  mail,
  onStar,
  onToggleRead,
  onRemoveMail,
  onRead,
  stopPropagation,
}) {
  return (
    <Link
      to={`/mail/${mail.id}`}
      onClick={() => {
        onRead(mail)
      }}
    >
      <section className={`mail-preview ${!mail.isRead ? "" : "unread"}`}>
        <button
          className="action mail-star"
          onClick={(ev) => {
            ;(stopPropagation(ev), onStar(mail))
          }}
        >
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
            onClick={(ev) => {
              ;(stopPropagation(ev), onRemoveMail(mail, mail.id))
            }}
          >
            <span title="Delete" className="material-symbols-outlined">
              delete
            </span>
          </button>

          {mail.isRead ? (
            <button
              title="Mark as unread"
              className="action"
              onClick={(ev) => {
                ;(stopPropagation(ev), onToggleRead(mail))
              }}
            >
              <span className="material-symbols-outlined">
                mark_email_unread
              </span>
            </button>
          ) : (
            <button
              title="Mark as read"
              className="action"
              onClick={(ev) => {
                ;(stopPropagation(ev), onToggleRead(mail))
              }}
            >
              <span className="material-symbols-outlined">mark_email_read</span>
            </button>
          )}

          {/* <button title="Archive" className="action">
            <span className="material-symbols-outlined">archive</span>
          </button> */}
        </div>
      </section>
    </Link>
  )
}
