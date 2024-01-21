import useWeatherService from "../Service/WeatherService"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

const withCurrent = (BaseComponent, getData, flag) => {
    return (props) => {
        const [current, setCurrent] = useState({})
        const {process, setProcess, clearError} = useWeatherService()
        const {city} = useParams()
        const {date} = useParams()

        useEffect(() => {
            updateCurrent()
        }, [props.city])

        const updateCurrent = () => {
            getData(props.city)
                .then(onCurrentLoaded)
                .then(() => setProcess('confirmed'))
                
        }

        const onCurrentLoaded = (current) => {
            if(flag){
                current = current.filter(item => {
                    if(item.date.num === date) return item
                })
                current = current.slice(0,1)
            }
            setCurrent(current)
        }

        return <BaseComponent 
                {...props}
                current={current}
                setCurrent={setCurrent}
                city={city}
                date={date}
                process={process}
                setProcess={setProcess}/>
    }
}

export default withCurrent