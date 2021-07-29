import React from 'react'

import { Container, Typography, Paper, Grid, Box, Divider} from "@material-ui/core";
import CallToActionIcon from '@material-ui/icons/CallToAction';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
// import Group from "../images/Group.png";
// import Rectangle from "../images/Rectangle.png";
import { Directions } from "@material-ui/icons";
import PropTypes from 'prop-types'
import Navbar from "./Navbar";
import "./CSS/mailer.css";

const Dashboard = props => {
    return (
        <div>
        <Navbar page='Dashboard' />
           
        <Container style={{marginTop:"75px"}}>
             <Grid container spacing={1}>
                <Grid item lg={3}> 
                    <Paper style={{ width:"250px"}}>
                        <div style={{display:"flex",marginTop:"20px", width:"300px"}}>
                        
                        <div>
                        <img src='/img/Group.png' alt="" style= {{marginTop:"16px" , marginLeft:"20px", marginBottom:"8px"}}/>
                        </div>
                       

                      <div className="" style={{marginTop:"24px", marginLeft:"16px"}}>
                     
                          
                            Total Campaigns
                           
                            <h3 className="" style={{marginTop:"2px"}}>04</h3>
                           
                     </div>
                    </div>


                       
                    </Paper>


                 </Grid>

                <Grid item lg={3}> 
                 <Paper style={{ width:"250px"}}>
                        <div style={{display:"flex",marginTop:"20px", width:"300px"}}>
                        
                        <div>
                        <img src="/img/Rectangle.png" alt="" style= {{marginTop:"16px" , marginLeft:"20px", marginBottom:"8px"}}/>
                        </div>
                       

                      <div className="" style={{marginTop:"24px", marginLeft:"16px"}}>
                     
                          
                            Total Clients
                           
                            <h3 className="" style={{marginTop:"2px"}}>234</h3>
                           
                     </div>
                    </div>


                       
                    </Paper>
                    </Grid>
                    </Grid>


        </Container>
        </div>
    )
}

Dashboard.propTypes = {}

export default Dashboard
