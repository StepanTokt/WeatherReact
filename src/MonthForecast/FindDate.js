import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FindDate.css'

const FindDate = (props) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = date => {
      setStartDate(date);
    };
  
    const handleEndDateChange = date => {
      setEndDate(date);
    };

    useEffect(()=>{
      props.changeDate(startDate, endDate)
    }, [startDate, endDate])
  
    return (
      <div className='findDate'>
        <DatePicker
          className="start"
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          minDate={new Date()}
        />
        <DatePicker
          className="end"
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
          minDate={startDate || new Date()}
        />
      </div>
    );
  };
  
  export default FindDate;
  