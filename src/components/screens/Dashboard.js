import React,{ useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianAxisProps, CartesianGrid, 
  Legend, Tooltip, AreaChart, Area, BarChart,Bar} from "recharts";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import { DatePicker, Space } from 'antd';

import CallToActionIcon from "@material-ui/icons/CallToAction";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
// import Group from "../images/Group.png";
// import Rectangle from "../images/Rectangle.png";
import { Directions } from "@material-ui/icons";
import PropTypes from "prop-types";
import Navbar from "../../common/Navbar";
import "../CSS/mailer.css";
import { CompaignList } from "../../redux/actionCreators/compaignsAction";
import { clientList } from "../../redux/actionCreators/clientAction";
import {getHistory,getHistoryByDate} from '../../redux/actionCreators/mailerActions';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null)
  const client = useSelector((state) => state.ClientReducer);
  const { campaigns } = useSelector((state) => state.CampaignReducer);
  const {history,historyDate} = useSelector((state) => state.ClientReducer);

  React.useEffect(() => {
    dispatch(clientList());
    dispatch(getHistory("",""))
    dispatch(CompaignList());
    
  }, []);

  useEffect(() => {
     dispatch(getHistoryByDate(date))
  }, [date])
 console.log(historyDate);
  const handleDate = (dateString) =>{
    setDate(dateString)
  }
  let obj;
  const data = history.map((item,i,arr)=>
    obj={
      date:item.createdAt.toDate().toISOString().substr(0,10),
      mails:history.filter(ele=>ele.createdAt.toDate().toISOString().substr(0,10)===item.createdAt.toDate().toISOString().substr(0,10)).length
    })

  let pData = Array.from(new Set(data.map(x=>x.date))).map(date=>{
    return{
      name:date,
      mails:data.find(s=>s.date===date).mails
    }});
    
    
  // let obj1;
  const data1 = historyDate.map((item,i,arr)=>
    obj={
      time:item.createdAt.toDate().getHours()>12?item.createdAt.toDate().getHours()-12:item.createdAt.toDate().getHours(),
      mails:historyDate.filter(ele=>ele.createdAt.toDate().getHours()===item.createdAt.toDate().getHours()).length
    })

    let pdata = Array.from(new Set(data1.map(x=>x.time))).map(hour=>{
      return{
        name:hour,
        mails:data1.find(s=>s.time===hour).mails
      }});


  return (
    <div>
      <Navbar page="Dashboard" />

      <Container style={{ marginTop: "75px" }}>
        <Grid container spacing={1}>
          <Grid item lg={3}>
            <Paper style={{ width: "250px" }}>
              <div
                style={{ display: "flex", marginTop: "20px", width: "300px" }}
              >
                <div>
                  <img
                    src="/img/Group.png"
                    alt=""
                    style={{
                      marginTop: "16px",
                      marginLeft: "20px",
                      marginBottom: "8px",
                    }}
                  />
                </div>

                <div
                  className=""
                  style={{ marginTop: "24px", marginLeft: "16px" }}
                >
                  Total Campaigns
                  <h3 className="" style={{ marginTop: "2px" }}>
                    {campaigns?.length <= 9
                      ? `0${campaigns?.length}`
                      : campaigns?.length}
                  </h3>
                </div>
              </div>
            </Paper>
          </Grid>


          <Grid item lg={3}>
            <Paper style={{ width: "250px" }}>
              <div
                style={{ display: "flex", marginTop: "20px", width: "300px" }}
              >
                <div>
                  <img
                    src="/img/Group.png"
                    alt=""
                    style={{
                      marginTop: "16px",
                      marginLeft: "20px",
                      marginBottom: "8px",
                    }}
                  />
                </div>

                <div
                  className=""
                  style={{ marginTop: "24px", marginLeft: "16px" }}
                >
                  Total Mail Sent
                  <h3 className="" style={{ marginTop: "2px" }}>
                    {history?.length<=9 ? `0${history?.length}` : history?.length}
                  </h3>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item lg={3}>
            <Paper style={{ width: "250px" }}>
              <div
                style={{ display: "flex", marginTop: "20px", width: "300px" }}
              >
                <div>
                  <img
                    src="/img/Rectangle.png"
                    alt=""
                    style={{
                      marginTop: "16px",
                      marginLeft: "20px",
                      marginBottom: "8px",
                    }}
                  />
                </div>

                <div
                  className=""
                  style={{ marginTop: "24px", marginLeft: "16px" }}
                >
                  Total Clients
                  <h3 className="" style={{ marginTop: "2px" }}>
                    {client?.clients?.length <= 9
                      ? `0${client?.clients?.length}`
                      : client?.clients?.length}
                  </h3>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        </Container>

           
      <Container style={{ marginTop: "75px" }}>
      <Grid container spacing={1}>
      <Grid item lg={6}>
        <h3> Total Mail Send </h3>
        <ResponsiveContainer width="150%" aspect={3}>
            <LineChart data={pData} width={500} height={300} margin={{top: 5, right: 300, left: 20, bottom: 5}}>
                <CartesianGrid />
                <XAxis dataKey="name" interval={"preserveStartEnd"}  />
                <YAxis />
                <Tooltip />
                <Legend />
               
                <Line margin={{left: 40, bottom: 5}} type="monotone" dataKey="mails" stroke="red" />
                {/* <Line type="monotone" dataKey="fees" stroke="red" /> */}
               


            </LineChart>

        </ResponsiveContainer>
        </Grid>
        
        <Grid item lg={6}>

        <h3>Total Mail send by Date  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; <DatePicker  onChange={(date, dateString)=>handleDate(dateString) } /> </h3>
        
        <ResponsiveContainer width="150%" aspect={3}>
            <BarChart data={pdata} width={500} height={300} margin={{top: 5, right: 300, left: 20, bottom: 5}}>
                <CartesianGrid />
                <XAxis dataKey="name" interval={"preserveStartEnd"}  />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar type="monotone" dataKey="mails" fill="#82ca9d" />
                {/* <Bar type="monotone" dataKey="fees" fill="#82ca9d" /> */}

                


            </BarChart>

        </ResponsiveContainer>

        </Grid>
        </Grid>

        
      </Container>
     
   
       
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
