import WeekData from "./WeekData"
import SearchLocation from '../MainPage/SearchLocation'
import FindDate from "./FindDate"
import { useState } from "react"

const MonthForecast = () => {
    const [city, setCity] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : 'Grodno')
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const changeCity = city => {
        if(city === 'Minsk City') setCity('Minsk')
        else setCity(city)
        localStorage.setItem('city', city)
    }

    const changeDate = (start,end) => {
        setStartDate(start)
        setEndDate(end)
    }

    return(
        <>
            <div className="month_flex">
                <SearchLocation changeCity={changeCity}/>
                <FindDate changeDate={changeDate}/>
            </div>
            <WeekData city={city} start={startDate} end={endDate}/> 
        </>
    )
}

export default MonthForecast


