// • Gets mails to show from service
// • Renders the list and the filter components (both top filter with search,
// and side filter for different folders)
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams),
  )
  function loadMails() {
    return mailService.query(filterBy).then(setMails)
  }
  useEffect(() => {
    loadMails()
    setSearchParams(utilService.trimObj(filterBy))
  }, [filterBy])
  
  console.log(mails);
  if (!mails) {
    return (
      <div className="loader">
        <p>Loading...</p>
      </div>
    )
  }
  return <section className="container">Mail app</section>
}
