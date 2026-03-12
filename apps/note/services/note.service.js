import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getFilterFromSearchParms,
    getDefaultFilter
}

// For Debug (easy access from console):
// window.cs = carService

function query(filterBy = {}) {

    return storageService.query(NOTES_KEY)
        .then(notes => { 
            
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => (regExp.test(note.info.title) || regExp.test(note.info.txt) ))
            }
            
            return notes })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            // note = _setNextPrevCarId(note)
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getEmptyNote() {
    return {
        createdAt: Date.now(), //in miliscounds
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            title: '',
            txt: ''
        }
    }
}

function getFilterFromSearchParms(searchParams){
    const defaultFilter = getDefaultFilter()
    const filterby ={}
    for (const field in defaultFilter) {
        filterby[field] = searchParams.get(field) || ''   
    }
    return filterby
}

function getDefaultFilter(filterBy = {txt: ''}){
    return {txt: filterBy.txt}
    
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)

    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    title: 'Go Fullstack',
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#0d0'
                },
                info: {
                    title: 'Go Bobi',
                    txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente illo ut ipsa cum. Deleniti magni porro consectetur, autem officiis nisi, officia similique omnis asperiores est rem iure veniam vel dolor!'
                    // url: 'http://some-img/me',
                    // title: 'Bobi and Me'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#d00'
                },
                info: {
                    title: 'Go Stuff',
                    txt: 'Get my stuff together'
                    // title: 'Get my stuff together',
                    // todos: [
                    //     {
                    //         txt: 'Driving license'
                    //         , isDone: true
                    //     },
                    //     { txt: 'Coding power', isDone: false }
                    // ]
                }
            },
            {
                id: 'n104',
                createdAt: 1112223,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#0d0'
                },
                info: {
                    title: 'Dodido',
                    txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente illo ut ipsa cum. Deleniti magni porro consectetur, autem officiis nisi, officia similique omnis asperiores est rem iure veniam vel dolor!Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente illo ut ipsa cum. Deleniti magni porro consectetur, autem officiis nisi, officia similique omnis asperiores est rem iure veniam vel dolor!Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente illo ut ipsa cum. Deleniti magni porro consectetur, autem officiis nisi, officia similique omnis asperiores est rem iure veniam vel dolor!'
                    // url: 'http://some-img/me',
                    // title: 'Bobi and Me'
                }
            }
        ]
    }
    utilService.saveToStorage(NOTES_KEY, notes)
}