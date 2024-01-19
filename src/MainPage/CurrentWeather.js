import './CurrentWeather.css'
import useWeatherService from '../Service/WeatherService'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import setContentCurrent from '../utils/setContentCurrent'
const CurrentWeather = (props) => {
    
    return(
        <div className="block">
            <Link className='current_link' to={`/${props.current.city}/${props.current.date}`}>
                {setContentCurrent(props.process, View, props.current)}
            </Link>
        </div>
    )
}

const View = ({data}) => {
    const {typeOfWeather, description, icon,temp, minTemp, maxTemp, city, date} = data
    return(  
        <div className="current_block">
           
            <div className="left_side_weather">
            <p className="date">{date}</p>
                <p className="city">{city}</p>
                <div className="degree_block">
                    <a className="degree">{temp}&deg;</a>
                    <a className="description">{typeOfWeather}</a>
                    <p className="desc">{description}</p>
                
                </div>
            </div>
            <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="" className="day_logo" />
       
            <div className="right_side_weather">
                <p className="min_temp">
                    <span className='min_max_text'>Minimal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-thermometer-low" viewBox="0 0 16 16">
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415"/>
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                    </svg>
                     <span className='min_max_degr'>{minTemp}&deg;</span>
                </p>
                <p className="max_temp">
                    <span className='min_max_text'>Maximal</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-thermometer-high" viewBox="0 0 16 16">
                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415"/>
                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                        </svg> 
                    <span className='min_max_degr'>{maxTemp}&deg;</span></p>
            </div>
        </div>
        
    )
}

export default CurrentWeather