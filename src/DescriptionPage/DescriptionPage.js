import CurrentWeather from "../MainPage/CurrentWeather"
import Details from "../MainPage/Details"
import ByHour from "./ByHour"
import WeatherByDay from './WeatherByDay'
import { useEffect, useState } from "react"
import useWeatherService from '../Service/WeatherService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withCurrent from '../hook/withCurrent'

const DescriptionPage = () => {
    const [city, setCity] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : 'Grodno')
    const {getWeek} = useWeatherService()
    const WeatherByD = withCurrent(WeatherByDay, getWeek, true)


    useEffect(()=>{
        toast.success(`Look at thiis...`);
    }, [city])
    return(
        <div>
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
            <WeatherByD/>
            <ByHour/>
            <Details city={city}/>
        </div>
    )
}

export default DescriptionPage