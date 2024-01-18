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

    const [slideIndex, setSlideIndex] = useState(1)
    const [slides, setSlides] = useState(8)

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
        current = current.slice(index,index+8)
        setCurrent(current)
    }

    const renderWeather = (weather) => {
        if(weather.length === 0) 
            return (
            <div className='nothing'>
                <h1>По вашему запросу ничего не найдено</h1>
            </div>
        )
        
        return weather.map((item,index) => (
            <div 
                key={item.id}
                className={ slideIndex-1 === index || slideIndex - 1 === index - 1 || slideIndex - 1 === index - 2 || slideIndex - 1 === index - 3 || slideIndex - 1 === index - 4 || slideIndex - 1 === index - 5 ? 'show byHour_grid-item' : 'hide'}>
                <div className="time">{(item.date.time).split(':').slice(0,2).join(":")}</div>
                <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt="" className="time_logo" />
                <p className="time_temp">{item.temp}&deg;</p>
            </div>
            
        ))
    }

    const elements = useMemo(() => {
        return setContentCurrent(process, () => renderWeather(current), null)
    }, [process, slideIndex])


    //CAROUSEL


    
    const plusSlides = (n) => {
        console.log(slideIndex+n)
        if(slideIndex+n === 0) setSlideIndex(1)
        else if(slideIndex+n === 4) setSlideIndex(3)
        else setSlideIndex(slideIndex+n)
    }

    return(
        <section className="byHour">
            <div className="carousel">
                <div 
                    className={slideIndex === 1 ? 'left gray' : 'left'}
                    onClick={()=>plusSlides(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                    </div>
                <div
                    className={slideIndex === 3 ? 'right gray' : 'left'}
                    onClick={()=>plusSlides(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg>
                    </div>
            </div>
            <div className="byHour_grid">
                
                {elements}
            </div>
        </section>
    )
}

export default ByHour