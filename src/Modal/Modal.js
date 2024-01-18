import './Modal.css'
import main_logo from '../img/main_logo.svg'
import '../styles/Header.css'
import { useEffect } from 'react'
import { useGeolocated } from "react-geolocated";
const Modal = ({active, setActive}) => {
    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (active) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
    }, [active])

    return(
        <div 
            className={active ? 'modal_section active' : "modal_section"}
            onClick={() => setActive(false)}>
            <div 
                className={active ? "modal_block active" : "modal_block"}
                onClick={(e) => e.stopPropagation()}>
                <div className='close'>
                    <span 
                        className='button_close'
                        onClick={() => setActive(false)}>close</span>
                </div>
                <div className="modal_header">
                    <img className='logo' src={main_logo} alt="" />
                    <h1 className="app_name">Dark Weather</h1>
                </div>
                <div className="modal_body">
                Hello, I'm Stepan Tokt, a student at the Belarusian State University of Informatics and Radioelectronics (BSUIR) hailing from Minsk. Currently immersed in the vibrant world of academia, I find joy in exploring the fascinating realms of technology and computer science.
                </div>
                <div className="modal_footer">
                    Created by Stepan Tokt
                </div>
            </div>
        </div>
    )

    // return !isGeolocationAvailable ? (
    //     <div>Your browser does not support Geolocation</div>
    // ) : !isGeolocationEnabled ? (
    //     <div>Geolocation is not enabled</div>
    // ) : coords ? (
    //     <table>
    //         <tbody>
    //             <tr>
    //                 <td>latitude</td>
    //                 <td>{coords.latitude}</td>
    //             </tr>
    //             <tr>
    //                 <td>longitude</td>
    //                 <td>{coords.longitude}</td>
    //             </tr>
    //         </tbody>
    //     </table>
    // ) : (
    //     <div>Getting the location data&hellip; </div>
    // );
}

export default Modal