import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './MainPage/MainPage'
import Header from "./Header";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
import MonthForecast from "./MonthForecast/MonthForecast";
import Modal from "./Modal/Modal"
import { useState } from "react";
const App = () => {
  const [modalActive, setModalActive] = useState(false)
  return (
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
  );
}

export default App;
