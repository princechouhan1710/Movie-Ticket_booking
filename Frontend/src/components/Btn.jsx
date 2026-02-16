import { memo, useState } from "react"

function Btn({ name, setfilter, filter, cat = null, lang = null }) {
    const [isActive, setIsActive] = useState(false)
    let handleClick = () => {
        if (!isActive) {
            setIsActive(true)
            if (lang) {
                console.log(filter.langauage);
                if (filter.langauage == null) {
                    filter.langauage = ""
                }
                setfilter({ ...filter, langauage: filter.langauage + "," + lang })
            }
            if (cat) {
                 if (filter.category == null) {
                    filter.category = ""
                }
                setfilter({ ...filter, category: filter.category + "," + cat })
            }
        } else {
            setIsActive(false)
            if (lang) {

                setfilter({ ...filter, langauage: filter.langauage.split(",").splice(filter.langauage.split(",").indexOf(lang), 1).join(",") })
            }
            if (cat) {
                setfilter({ ...filter, category: filter.category.split(",").splice(filter.category.split(",").indexOf(cat), 1).join(",") })
            }
        }
        // console.log(filter)
    }
    return (
        <>
            <button onClick={handleClick} className={`px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition cursor-pointer ${isActive && "bg-blue-600"}`}>
                {name}
            </button>
        </>
    )
}
export default memo(Btn)