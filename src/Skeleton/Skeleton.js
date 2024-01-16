import './Skeleton.css'
import '../Service/WeatherService'
const Skeleton = ()=> {
    return(
        <section className='skeleton_description_details'>
            <div className="skeleton_main_details_grid">
                <div className="skeleton_main_details_grid-item">
                    <div className="skeleton_characteristic pulse"></div>
                    <div className="skeleton_characteristic_value pulse"></div>
                </div>
                <div className="skeleton_main_details_grid-item">
                    <div className="skeleton_characteristic pulse"></div>
                    <div className="skeleton_characteristic_value pulse"></div>
                </div>
                <div className="skeleton_main_details_grid-item">
                    <div className="skeleton_characteristic pulse"></div>
                    <div className="skeleton_characteristic_value pulse"></div>
                </div>
                <div className="skeleton_main_details_grid-item">
                    <div className="skeleton_characteristic pulse"></div>
                    <div className="skeleton_characteristic_value pulse"></div>
                </div>
                <div className="skeleton_main_details_grid-item">
                    <div className="skeleton_characteristic pulse"></div>
                    <div className="skeleton_characteristic_value pulse"></div>
                </div>
                <div className="skeleton_main_details_grid-item">
                    <div className="skeleton_characteristic pulse"></div>
                    <div className="skeleton_characteristic_value pulse"></div>
                </div>
            </div>
        </section>
        
    )
}

export default Skeleton