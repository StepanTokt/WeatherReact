import useWeatherService from "../Service/WeatherService"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

const withCurrent = (BaseComponent, getData, flag) => {
    return (props) => {
        const [current, setCurrent] = useState({})
        const { process, setProcess, clearError, getOneDay, getWeek } = useWeatherService()
        const { city } = useParams()
        const { date } = useParams()
        
        useEffect(() => {
            updateCurrent()
            console.log('render')
        }, [props.city])

        const updateCurrent = () => {
            if(flag){
                getWeek(props.city)
                .then(onCurrentLoaded)
                .then(() => setProcess('confirmed')) 
            }else{
                getOneDay(props.city)
                .then(onCurrentLoaded)
                .then(() => setProcess('confirmed')) 
            }
        }

        const onCurrentLoaded = (current) => {
            console.log(current)
            if (flag) {
                current = current.filter(item => {
                    if (item.date.num === date) return item;
                });
                current = current.slice(0, 1);
            }

            setCurrent(current);
        }
        
        return <BaseComponent
            {...props}
            current={current}
            setCurrent={setCurrent}
            city={city}
            date={date}
            process={process}
            setProcess={setProcess} />
    }
}

export default withCurrent;
