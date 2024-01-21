import './MainPage.css'
import SearchLocation from './SearchLocation'
import CurrentWeather from './CurrentWeather'
import { useMemo, useState } from 'react'
import Details from './Details'
import useWeatherService from '../Service/WeatherService'
import { useGeolocated } from "react-geolocated";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withCurrent from '../hook/withCurrent'
import {Helmet} from "react-helmet";



const MainPage = () => {
    const {getOneDay} = useWeatherService()
    const CurrentW = withCurrent(CurrentWeather, getOneDay, false)
   
    const [city, setCity] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : 'Grodno')
    const changeCity = city => {
        if(city === 'Minsk City') setCity('Minsk')
        else setCity(city)
        localStorage.setItem('city', city)
        if(city) toast.success(`Nice city: ${city}`);
    }
    

    return(
        <div>
            <Helmet>
                <meta name='Today' content='Today Weather' />
                <title>Today weather</title>
            </Helmet>
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <SearchLocation changeCity={changeCity}/>
            <CurrentW city={city}/>
            <Details city={city}/>
        </div>
    )
}

export default MainPage