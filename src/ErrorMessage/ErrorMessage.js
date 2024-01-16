import img from '../img/err.gif'

const ErrorMessage = () => {
    return(
        <img src={img} style={{
            display: 'block',
            width: '250px',
            height: '250px',
            margin: '0 auto'
        }}/>
    )
}

export default ErrorMessage