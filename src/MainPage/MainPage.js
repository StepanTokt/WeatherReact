import './MainPage.css'
import SearchLocation from './SearchLocation'
import CurrentWeather from './CurrentWeather'
import { useState } from 'react'
import Details from './Details'
import useWeatherService from '../Service/WeatherService'
import { useGeolocated } from "react-geolocated";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {

   
    const [city, setCity] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : 'Grodno')
    const notify = () => toast("Wow so easy!");
    const changeCity = city => {
        if(city === 'Minsk City') setCity('Minsk')
        else setCity(city)
        localStorage.setItem('city', city)
        toast.success(`Nice city: ${city}`);
    }
    

    return(
        <div>
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
            <CurrentWeather city={city}/>
            <Details city={city}/>
        </div>
    )
}

export default MainPage