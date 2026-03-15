import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"

export function NotePreview({ note, onUpdateNote }) {

    function onChangeInfo(updatedInfo) {
        const updatedNote = { ...note, info: updatedInfo }
        onUpdateNote(updatedNote)
    }

    return <DynamicNoteByType
        info={note.info}
        cmpType={note.type}
        onChangeInfo={onChangeInfo} />
}

function DynamicNoteByType(props) {

    const cmpMap = {
        NoteTxt: <NoteTxt {...props} />,
        NoteImg: <NoteImg {...props} />,
        NoteTodos: <NoteTodos {...props} />,
    }

    return cmpMap[props.cmpType]
}

