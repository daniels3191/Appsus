// • Routable component (page)
// • show the entire mail
// • Allow deleting a mail (using the service)
// • Allow navigating back to the list
// • Allow navigating to next/prev emails

const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails({ onRemoveMail }) {
  const [mail, setMail] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  function onDelete() {
    onRemoveMail(mail, mail.id)
    navigate("/mail")
  }
  useEffect(() => {
    mailService.get(params.id).then(setMail)
  }, [params.id])

  if (!mail)
    return (
      <div className="loader">
        <span>Loading...</span>
      </div>
    )
  // console.log(mail)

  return (
    <section className="mail-details">
      <div className="details-actions-container">
        <div className="actions">
          <Link to="/mail">
            <span className="details-back-button action material-symbols-outlined">
              keyboard_backspace
            </span>
          </Link>
          <button
            title="Archive"
            className="details-btn details-archive-button action"
          >
            <span className="material-symbols-outlined">archive</span>
          </button>
          <button
            title="Delete"
            className="details-btn action"
            onClick={onDelete}
          >
            <span title="Delete" className="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
      </div>
      <div className="details-container">
        <h2 className="details-title">{mail.subject}</h2>
        <p className="details-from">{mail.from}</p>
        <p className="details-body">{mail.body}</p>
        <div className="details-nav-btns">
          <nav>
            <Link to={`/mail/${mail.prevMailId}`}>
              <button>
                <span class="material-symbols-outlined">arrow_top_left</span>
                Prev
              </button>
            </Link>
            <Link to={`/mail/${mail.nextMailId}`}>
              <button>
                <span class="material-symbols-outlined">arrow_top_right</span>
                Next
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </section>
  )
}
