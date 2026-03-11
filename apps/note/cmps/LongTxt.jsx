const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
    const [str, setStr] = useState(getSubStr())
    const [isLongTxt, setIsLongTxt] = useState(false)

    useEffect(() => {
        if (!isLongTxt) setStr(getSubStr())
        else setStr(txt)

    }, [isLongTxt])

    function getSubStr() {
        const subStr = txt.substring(0, length)
        return subStr
    }

    function toggleIsLongTxt() {
        setIsLongTxt(prev => !prev)
    }
    return <article className="long-txt">
        <p>{str}</p>
        <button onClick={toggleIsLongTxt}>Read {isLongTxt ? 'less' : 'more'}</button>
    </article>
}