import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './MainPage/MainPage'
import Header from "./Header";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
import MonthForecast from "./MonthForecast/MonthForecast";
import { useState } from "react";

const App = () => {
  const [city, setCity] = useState('Minsk')
  return (
    <Router>
      <Header/>
      <div className="container">
        <Routes>
            <Route path='/' element = { <MainPage/>}/>
            <Route path='/:city/:date' element = { <DescriptionPage/>}/>
            <Route path='/month' element = { <MonthForecast/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
