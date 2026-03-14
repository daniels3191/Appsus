const { useOutletContext } = ReactRouterDOM

export function FilteredNotes(){

    const {notes} = useOutletContext

    return <section className="filtered-notes">
        Filterd list
    </section>

}