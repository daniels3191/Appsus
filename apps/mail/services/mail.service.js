import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
import { mailData } from "./mail.data.js"
// mail service

const MAIL_KEY = "mailDB"
_createMails()

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Itay Moyal",
}

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getDefaultFilter,
  getFilterFromSearchParams,
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i")
      mails = mails.filter(
        (mail) => regExp.test(mail.subject) || regExp.test(mail.body),
      )
    }

    if (filterBy.isRead) {
      mails = mails.filter((mail) => mail.isRead === filterBy.isRead)
    }
    if (filterBy.isStarred) {
      mails = mails.filter((mail) => mail.isStarred === filterBy.isStarred)
    }
    if (filterBy.status === "inbox") {
      mails = mails.filter(
        (mail) => mail.to === loggedinUser.email && !mail.removedAt,
      )
    }
    if (filterBy.status === "sent") {
      mails = mails.filter(
        (mail) => mail.to === loggedinUser.email && !mail.removedAt,
      )
    }
    if (filterBy.status === "trash") {
      mails = mails.filter((mail) => mail.removedAt !== null)
    }
    if (filterBy.status === "draft") {
      mails = mails.filter((mail) => !mail.sentAt)
    }
    // Labels not implemented yet,Need to figure it out.
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    mail = _setNextPrevMailId(mail)
    return mail
  })
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail(
  subject = "",
  body = "",
  from = "",
  to = "user@appsus.com",
) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    sentAt: new Date(),
    labels: [],
    removedAt: null,
    from,
    to,
  }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = mailData
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function _createMail(subject, body) {
  const mail = getEmptyMail(subject, body)
  mail.id = utilService.makeId()
  return mail
}

function _setNextPrevMailId(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1]
      ? mails[mailIdx - 1]
      : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}

  for (const field in defaultFilter) {
    const value = searchParams.get(field)
    if (value === "true") filterBy[field] = true
    else if (value === "false") filterBy[field] = false
    else {
      filterBy[field] = value || defaultFilter[field]
    }
  }
  return filterBy
}

function getDefaultFilter(
  filterBy = {
    txt: "",
    isRead: false,
    isStarred: false,
    labels: [],
  },
) {
  return {
    txt: filterBy.txt,
    status: filterBy.status,
    isRead: filterBy.isRead,
    isStarred: filterBy.isStarred,
    labels: filterBy.labels,
  }
}
