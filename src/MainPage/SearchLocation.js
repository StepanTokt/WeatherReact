import './SearchLocation.css'
import icon_search from '../img/icon _search_.png'
import { useState } from 'react'
const SearchLocation = (props) => {
    const [value, setValue] = useState()

    const sendValue = () => {
        props.changeCity(value)
    }

    return(
        <div className="search_block">
            
            <input 
                className='search_input' 
                type="text"
                placeholder='Search location...' 
                onChange={(e) => setValue(e.target.value)}
                />
            <div 
                className="submit"
                onClick={sendValue}>
                <img src={icon_search} alt="" className="loop" />
                </div>
        </div>
    )
}

export default SearchLocation