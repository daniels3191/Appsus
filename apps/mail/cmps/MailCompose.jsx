// • Display a form with: to, subject and body
// • Use the service to send a mail (add a mail to the list)

const { useEffect, useState } = React

import { MailComposeModal } from "./MailComposeModal.jsx"

export function MailCompose({ onMailSent }) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleIsOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <section className="mail-compose-container">
      <div className="mail-compose">
        <button className="mail-compose-btn" onClick={toggleIsOpen}>
          <span className="material-symbols-outlined">edit</span>
          Compose
        </button>
        {isOpen && (
          <MailComposeModal
            onMailSent={onMailSent}
            toggleIsOpen={toggleIsOpen}
          />
        )}
      </div>
    </section>
  )
}
