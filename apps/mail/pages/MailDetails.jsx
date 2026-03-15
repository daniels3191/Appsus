// • Routable component (page)
// • show the entire mail
// • Allow deleting a mail (using the service)
// • Allow navigating back to the list
// • Allow navigating to next/prev emails

const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const params = useParams()

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
      <h2 className="details-title">{mail.subject}</h2>
      <p className="details-from">{mail.from}</p>
      <p className="details-body">{mail.body}</p>

      <nav>
        <Link to={`/mail/${mail.prevMailId}`}>
          <button>Prev</button>
        </Link>
        <Link to={`/mail/${mail.nextMailId}`}>
          <button>Next</button>
        </Link>
        {/* <Link to="/mail">
          <button>Back</button>
        </Link> */}
      </nav>
    </section>
  )
}
