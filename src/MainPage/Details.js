import './Details.css'
import useWeatherService from '../Service/WeatherService'
import { useEffect, useState } from 'react'
import setContent from '../utils/setContent'
import { useParams } from 'react-router-dom'
const Details = (props)=> {
    const [current, setCurrent] = useState({})
    const {getOneDay, getWeek, process, setProcess} = useWeatherService()
    const [buttonClicked, setButtonClicked] = useState(false);
    const {date} = useParams()
    useEffect(()=>{
        if(buttonClicked) updateDetails()
    },[buttonClicked, props.city])

    const updateDetails = () => {
        getWeek(props.city)
            .then(currentChanged)
            .then(() => setProcess('confirmed'))
    }

    const currentChanged = (current) =>{
        if(date){
            current = current.filter(item => {
                if(item.date.num === date) return item
            })[0]
        }else{
            current = current.slice(0,1)[0]
        }
        
        setCurrent(current)
    }

    return(
        <section className='description_details'>
           <h2 
           className='h2_details' 
           onClick={() => setButtonClicked(true)}>Weather Details</h2>
            {setContent(process, View, current)}

        </section>
        
    )
}

export default Details


const View = ({data}) => {
    const {feelsLike, pressure, humidity, wind, clouds,rain} = data
    
    return(
        <>
             
             <div className="main_details_grid">
            <div className="main_details_grid-item">
                <div className="characteristic">Wind</div>
                <div className="characteristic_value">{wind}</div>
            </div>
            <div className="main_details_grid-item">
                <div className="characteristic">Humidity</div>
                <div className="characteristic_value">{humidity}</div>
            </div>
            <div className="main_details_grid-item">
                <div className="characteristic">Pressure</div>
                <div className="characteristic_value">{pressure}</div>
            </div>
            <div className="main_details_grid-item">
                <div className="characteristic">Feels like</div>
                <div className="characteristic_value">{feelsLike}&deg;</div>
            </div>
            <div className="main_details_grid-item">
                <div className="characteristic">Clouds</div>
                <div className="characteristic_value">{clouds}</div>
            </div>
            <div className="main_details_grid-item">
                <div className="characteristic">Rain</div>
                <div className="characteristic_value">{rain}</div>
            </div>
        </div>
        </>
        
    )
}