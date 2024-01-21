import { useHttp } from "../hook/http.hook";

const useWeatherService = () => {
    const {request, process, setProcess, clearError} = useHttp()

    const _apiKey = 'e89c211e9bf394598e4ce6cf6e941bca'
    const _http = 'https://api.openweathermap.org/data/2.5/'

    const geoCodding = async(city) => {
        const res = await request(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${_apiKey}`)
        if(res.length === 0) setProcess('error')
        return await res
    }

    const getOneDay = async(city='Minsk') => {
        const data = await geoCodding(city);
    
        // if (!data || data.length === 0) {
        //     setProcess('error');
        //     return null;  // или другое значение, которое указывает на отсутствие данных
        // }
    
        const res = await request(`${_http}weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${_apiKey}`);
        
        // if(res.length === 0) {
        //     setProcess('error');
        //     return null;
        // }
    
        res.name = data[0].name;
        return _transformOneDay(res);
    }
    

    const getWeek = async(city='Minsk') => {
        const data = await geoCodding(city)
        const res = await request(`${_http}forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${_apiKey}&units=metric`)
        if(res.length === 0) setProcess('error')
        res.name = data[0].name
        return res.list.map(_transformWeek)
    }

    const getCity = async(city='Minsk') => {
        const data = await geoCodding(city)
        const res = await request(`${_http}forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${_apiKey}&units=metric`)
        if(res.length === 0) setProcess('error')
        res.name = data[0].name
        return _transformCity(res)
    }

    const getCityWithCoordinates = async(lat, lon) => {
        const res = await request(`${_http}forecast?lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`)
        if(res.length === 0) setProcess('error')
        return _transformCity(res)
    }

    const _transformCity = (char) => {
        return{
            city: char.city.name,
        }
    }

    const _transformWeek = (char) => {
        return{
            id: char.dt,
            typeOfWeather: char.weather[0].main,
            description: char.weather[0].description,
            icon: char.weather[0].icon,
            temp: Math.round(char.main.temp),
            feelsLike: Math.round(char.main.feels_like),
            minTemp: Math.round(char.main.temp_min - 2),
            maxTemp: Math.round(char.main.temp_max + 3),
            pressure: `${char.main.pressure} hPa`,
            humidity: `${char.main.humidity}%`,
            wind: `${char.wind.speed} m/s`,
            // city: char.city.name,
            date: {
                num: (char.dt_txt).split(' ')[0].split('-').reverse().join('-'),
                time: (char.dt_txt).split(' ')[1]
            },
            rain : char.rain ? `${char.rain["3h"]} mm` : "No info",
            clouds: `${char.clouds.all}%`
        }
    }


    const _transformOneDay = (char) => {
        let date = new Date(char.dt*1000)
        let month = date.getMonth()+1
        month = month < 10 ? `0${month}` : month
        date = `${date.getDate()}-${month}-${date.getFullYear()}`
        return {
            id: char.id,
            typeOfWeather: char.weather[0].main,
            description: char.weather[0].description,
            icon: char.weather[0].icon,
            temp: Math.round(char.main.temp-273),
            feelsLike: Math.round(char.main.feels_like-273),
            minTemp: Math.round(char.main.temp_min-273 - 2),
            maxTemp: Math.round(char.main.temp_max-273 + 3),
            pressure: `${char.main.pressure} hPa`,
            humidity: `${char.main.humidity}%`,
            wind: `${char.wind.speed} m/s`,
            city: char.name,
            date: date,
            rain : char.rain ? `${char.rain["1h"]} mm` : "No info",
            clouds: `${char.clouds.all}%`
        }
    }

    return{
        process,
        setProcess,
        getOneDay,
        clearError,
        getWeek,
        getCity,
        getCityWithCoordinates
    }
}

export default useWeatherService