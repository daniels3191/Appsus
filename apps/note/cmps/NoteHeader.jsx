import { KeepLogo } from "../svgs/KeepLogo.jsx";
import { NoteFilter } from "./NoteFilter.jsx";

export function NoteHeader({ filterBy, setFilterBy }) {

    return <section className="note-header">
        <KeepLogo />
        <span className="keep">Keep</span>
        <NoteFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
        />
    </section>

}