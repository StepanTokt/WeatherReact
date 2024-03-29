import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './MainPage/MainPage'
import Header from "./Header";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
import MonthForecast from "./MonthForecast/MonthForecast";
import Modal from "./Modal/Modal"
import Spinner from "./Spinner/Spinner";
import { useEffect, useMemo, useState } from "react";
import { useGeolocated } from "react-geolocated";
import WeatherService from './Service/WeatherService'
const App = () => {
  const [modalActive, setModalActive] = useState(false)
  const [city, setCity] = useState()
  const {getCityWithCoordinates, getOneDay, getDayWithCity} = WeatherService()
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
  });

  useEffect(()=>{
    if(coords){
      updateCity()  
    }
    if(!isGeolocationAvailable || !isGeolocationEnabled){
      localStorage.setItem('city', 'Grodno')
      setCity('Grodno')
    }
  },[coords, city, isGeolocationAvailable, isGeolocationEnabled])
  

  const updateCity = () => {

    
    // getCityWithCoordinates(coords.latitude, coords.longitude)
    // .then(onCityLoaded) 
    
    getDayWithCity(coords.latitude, coords.longitude) 
    .then((data) => getOneDay(data.city)) 
    .then(onCityLoaded)
    .catch(() => onCityLoaded('Сочи'))
}

const onCityLoaded = (current) => {
    if(current.city === 'Minsk City')
      {
        localStorage.setItem('city', 'Minsk')
        setCity('Minsk')
      }else if(current.city){
        localStorage.setItem('city', current.city)
        setCity(current.city)
      }else{
        localStorage.setItem('city', current)
        setCity(current)
      }
}

const renderGood = useMemo(()=>{
  return(
    <Router>
        <Header active={modalActive} setActive={setModalActive}/>
        <div className="container">
          <Routes>
              <Route path='/' element = { <MainPage/>}/>
              <Route path='/:city/:date' element = { <DescriptionPage/>}/>
              <Route path='/month' element = { <MonthForecast/>}/>
          </Routes>
        </div>
        <Modal active={modalActive} setActive={setModalActive}/>
      </Router>
  )
}, [modalActive])

  return !isGeolocationAvailable && localStorage.getItem('city')  ? (
    renderGood
) : !isGeolocationEnabled && localStorage.getItem('city') ? (
  renderGood
) : coords && city && localStorage.getItem('city') ? (
  renderGood
) : (
    <Spinner/>
);
}

export default App;


