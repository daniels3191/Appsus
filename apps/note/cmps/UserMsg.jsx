const { useState, useEffect } = React
import { eventBus } from '../services/event-bus.service.js'

export function UserMsg() {
    const [ msg, setMsg ] = useState(null)

    useEffect(() => {
        eventBus.on('user-msg', showMsg)
    }, [])

    function showMsg(msg) {
        setMsg(msg)
        setTimeout(() => setMsg(null), 1500)
    }

	if (!msg) return <span></span>

	return <section className={`user-msg ${msg.type}`}>
        {msg.txt}
    </section>
}
