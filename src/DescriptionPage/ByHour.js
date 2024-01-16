import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import setContentCurrent from '../utils/setContentCurrent'
import './ByHour.css'
import useWeatherService from "../Service/WeatherService"
const ByHour = () => {
    const [current, setCurrent] = useState({})
    const {getWeek, process, setProcess} = useWeatherService()
    const {city} = useParams()
    const {date} = useParams()
    useEffect(() => {
        updateCurrent()
    }, [city])

    const updateCurrent = () => {
        getWeek(city)
            .then(onCurrentLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCurrentLoaded = (current) => {
        const index = current.findIndex(item => item.date.num === date)
        if(index+6>40) index = 40
        current = current.slice(index,index+6)
        setCurrent(current)
    }

    const renderWeather = (weather) => {
        if(weather.length === 0) 
            return (
            <div className='nothing'>
                <h1>По вашему запросу ничего не найдено</h1>
            </div>
        )
        return weather.map(item => (
            <div className="byHour_grid-item">
                <div className="time">{(item.date.time).split(':').slice(0,2).join(":")}</div>
                <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt="" className="time_logo" />
                <p className="time_temp">{item.temp}&deg;</p>
            </div>
        ))
    }

    const elements = useMemo(() => {
        return setContentCurrent(process, () => renderWeather(current), null)
    }, [process])

    return(
        <section className="byHour">
            <div className="byHour_grid">
                
                {elements}
            </div>
        </section>
    )
}

export default ByHour