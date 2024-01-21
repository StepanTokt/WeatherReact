import './MonthForecast.css'
import { useState, useEffect, useMemo } from 'react'
import useWeatherService from '../Service/WeatherService'
import { Link } from 'react-router-dom'
import setContentCurrent from '../utils/setContentCurrent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeekData = (props) => {
    const [weather, setWeather] = useState([])
    const {getWeek, process, setProcess} = useWeatherService()
    const [count, setCount] = useState(2)
    useEffect(() => {
        updateWeather()
    },[props.city, props.start, props.end])

    const updateWeather = () => {
        getWeek(props.city)
            .then(onWeatherLoaded)
            .then(() => setProcess('confirmed'))
    }

   

    const onWeatherLoaded = (weather) => {
        weather = weather.filter((item, i) => {if(i%8===0) return item})

        
        weather = weather.filter(item => {
            let currentDate = (item.date.num).split('-').reverse().join('-')
            currentDate = new Date(currentDate)

            if(props.start && !props.end){
                if(props.start < currentDate){
                    return item
                }
                
            }
            if(!props.start && props.end){
                if(props.end > currentDate)
                return item
            }
            if(props.start && props.end){
                if(props.start < currentDate && props.end > currentDate)
                return item
            }
            if(!props.start && !props.end)
            return item
        })

        setWeather(weather)

        if (weather.length === 0) {
            toast.warn(`No information`);
            setCount(6);
        }
    }

    const renderWeather = (weather) => {
        if(weather.length === 0) 
            return (
            <div className='nothing'>
                <h1>По вашему запросу ничего не найдено</h1>
            </div>
        )
        return weather.slice(0,count).map(item => (
            <Link className='current_link' to={`/${props.city}/${item.date.num}`}>
                <div className="current_block-item" key={item.id}>
                    <div className="month-left_side_weather">
                        <div className='city_img'>
                            <p className="month-city">{props.city}</p>
                            <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt="" className="month-day_logo" />
                        </div>
                        <div className="month-degree_block">
                            <a className="month-degree">{item.temp}&deg;</a>
                            <p className="month-description">{item.typeOfWeather}</p>
                            <p className="month-date">{item.date.num}</p>
                        </div>
                    </div>
                </div>
            </Link>
        ))
    }

    const elements = useMemo(() => {
        return setContentCurrent(process, () => renderWeather(weather), null)
    }, [process, count])

    return(
        
        <div className="MonthForecast">
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <div className="month_grid">
                
            {elements}
                
            </div>
            {count < 6 && process==='confirmed' && count < weather.length ? 
            <button 
            className="more"
            onClick={() => setCount(count+2)}>Show more</button>
            :
            null}
        </div>
    )
}

export default WeekData