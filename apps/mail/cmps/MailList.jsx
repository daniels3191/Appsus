// • Renders a list of <MailPreview> pass down a mail prop
import { MailPreview } from "./MailPreview.jsx"
export function MailList({
  mails,
  onStar,
  onToggleRead,
  onRemoveMail,
  onRead,
}) {
  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li className="mail-item clean-list" key={mail.id}>
            <MailPreview
              mail={mail}
              onStar={onStar}
              onToggleRead={onToggleRead}
              onRemoveMail={onRemoveMail}
              onRead={onRead}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
