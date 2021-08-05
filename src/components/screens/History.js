import React,{ useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../common/Navbar'
import '../CSS/mailer.css'
import { DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {getHistory} from '../../redux/actionCreators/mailerActions';
import HistoryTable from '../tables/HistoryTable';
const History = props => {
  const [date, setDate] = useState({
    startDate:"",
    endDate:"",
  })
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch()
    const data = useSelector((state) => state.ClientReducer.history);

    const handleDate = (dateString) =>{
      setDate({...date,startDate:dateString[0],endDate:dateString[1]})
    }
    useEffect(() => {
     dispatch(getHistory(date.startDate,date.endDate))
    }, [date])
    return (
        <div className='mailer'>
            <Navbar page='History' />
            <div style={{ display: 'flex' }}>
        <div className='split left'>
          <span style={{ marginLeft: '30px' }}> All History </span>
        </div>
        <div className='split right'>
          <span style={{ marginLeft: '0px' }}>
            Select Date   <RangePicker  onChange={(date, dateString)=>handleDate(dateString)}/>
            
          </span>
        </div>
        
      </div>
      <div className='tble'>
       <HistoryTable data={data}/>
      </div>
        </div>
    )
}

History.propTypes = {

}

export default History
