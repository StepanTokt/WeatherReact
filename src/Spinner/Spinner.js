// import { useEffect, useState } from "react"
// import winter from '../img/Snow.gif'
// import storm from '../img/Storm.gif'
// import sun from '../img/Sunny.gif'
// import './Spinner.css'
// const Spinner = () => {
//     return(
//         <div>
//             <img className="spinner" src={sun} alt="" />
//         </div>
//     )
// }

// export default Spinner




import { useEffect, useMemo, useState } from "react"
import winter from '../img/Snow.gif'
import storm from '../img/Storm.gif'
import sun from '../img/Sunny.gif'
import './Spinner.css'
const Spinner = () => {
    const [random, setRandom] = useState(null)

    useEffect(() => {
        setRandom(Math.floor(Math.random()*10 + 1))
    }, [])

    const spinner = useMemo(()=>{
        if(random <= 3) return (
            <div>
                <img className="spinner" src={sun} alt="" />
            </div>
        )
        if(random > 3 &&random <= 7 ) return (
            <div>
                <img className="spinner" src={winter} alt="" />
            </div>
        )
        if(random > 7 && random <= 10) return (
            <div>
                <img className="spinner" src={storm} alt="" />
            </div>
        )
    },[])

    return(
        <div>
            {spinner}
        </div>
    )
}

export default Spinner