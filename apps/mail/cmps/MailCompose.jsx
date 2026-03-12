// • Display a form with: to, subject and body
// • Use the service to send a mail (add a mail to the list)

export function MailCompose() {
  return (
    <section className="mail-compose-container">
      <div className="mail-compose">
        <button className="mail-compose-btn">
          <span className="material-symbols-outlined">edit</span>
          Compose
        </button>
      </div>
    </section>
  )
}