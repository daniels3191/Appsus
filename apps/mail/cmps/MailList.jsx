// • Renders a list of <MailPreview> pass down a mail prop
import { MailPreview } from "./MailPreview.jsx"
export function MailList({ mails }) {
  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li key={mail.id}>
            <MailPreview mail={mail} />
            <div className="actions">
              <button className="btn-remove">R</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
