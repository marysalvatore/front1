import React from 'react';
// import Animate from 'animate.css-react'
// import 'animate.css/animate.css'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Home.module.css';
// import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import {Container, Row, Col, Button} from 'react-bootstrap'

// import secondSlide from '../../assets/images/personel.jpg'
import cards from '../../assets/icons/checks.png'
import home from '../../assets/icons/h1.png'
import save from '../../assets/icons/savebank.png'
import check from '../../assets/icons/withdraw.png'
import loan from '../../assets/icons/loans.png';
import checking from '../../assets/icons/checking.png'
import mobile from '../../assets/images/box.jpeg'
import lap from '../../assets/images/laptop.jpeg';
import ph from '../../assets/images/phones.png';
// import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Carousel from './Carousel/OwlCarousel'





// import styled, { keyframes } from 'styled-components';
import Footer from '../../components/Navigation/Footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});

// import ScrollSink from '../../components/MotionElements/ScrollSink/ScrollSink'
// import { Motion, spring, presets } from 'react-motion';







class Home extends React.Component {

  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = { scrollTop: 0 }
  }

  
    // ControlledCarousel = () => {
    //     const [index, setIndex] = useState(0);
    // }
    // handleSelect = (selectedIndex, e) => {
    //       setIndex(selectedIndex);
    //     };


    onScroll = () => {
      const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
      const scrollTop = this.myRef.current.scrollTop
      console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
      this.setState({
        scrollTop: scrollTop
      })
    }

    
    render() {
      
        return(
            <Aux>
               
              <Carousel />

              
              <Container>

              <div className={classes.secondDiv} >
                  
                  <div data-aos="fade-right" className={classes.left} >
                   
                                <h4 style={{color: "#14477b"}}>Who We Are?</h4>
                                <h2>OUR VALUES AND GOAL.</h2>
                                <col></col>
                                <p style={{textAlign: "left"}}>
                                We provide the highest level of banking sophistication, coupled with customer-focused banking talent and backed by the experience of some of the best bankers in the business. That means you’ll enjoy a unique combination of innovative thinking and extraordinary customer service from a team that knows how to make things happen.
                                </p>
                       
                  </div>

                  <div data-aos="zoom-in"  className={[classes.right, classes.img].join(' ')} >
                    <img style={{height: '11em', position: 'absolute', right: '20em'}} src={ph} alt="ph" />
                    <img style={{height: '11em'}} alt="insp" src={lap}>
                        
                      </img> 
                    
                  </div>
                  
               </div>

              </Container>
               
               <div className={classes.gradientDiv}>
                  <Container>
                    <Row >
                 <Col data-aos="zoom-in" style={{color: 'white', marginTop: '6em'}}>
                      New Ansel Bank Customers <br></br>
                      Open a new Ansel Bank® account and set up direct deposit. <br />
                      <Button variant="outlined" color="warning" className={classes.signUpBtnGradient} style={{color: 'white'}} >
                                  Sign Up
                      </Button>
                 </Col>

                 <Col data-aos="zoom-in" style={{ background: 'white', marginTop: '4em', padding: '2em'}}>
                   <Row>
                     <Col md={8}>
                          <h2>Welcome</h2>
                          Enrolled? Sign In Now
                     </Col>
                     <Col md={4}>
                     <Button className={classes.loginBtnGradient} style={{ marginTop: '2em'}} >
                            Login
                      </Button>
                     </Col>
                   </Row>
                   
                 </Col>

                </Row>
              </Container>
               </div>
               


                <div style={{marginTop: '2em'}}>
                  <div data-aos="fade-up" className={classes.Help}>
                      What can we help you get done today?
                      
                 </div>
                 <Row data-aos="fade-up" className={classes.FirstDiv} style={{marginTop: '2em'}}>  
                         <Col  md={2} className={classes.What}>
                          <img style={{height: '6em'}} src={cards} alt="info1"></img>
                             <h5>Open a checking account</h5>
                          </Col>
                         <Col  md={2} className={classes.What}> 
                          <img style={{height: '6em'}} src={check} alt="info2"></img> 
                             <h5>Get a debit Card</h5>
                          </Col>
                         <Col  md={2} className={classes.What}> 
                          <img style={{height: '6em'}} src={home} alt="info3"></img> 
                             <h5>Buy a home</h5>
                          </Col>
                         <Col  md={2} className={classes.What}> 
                            <img style={{height: '6em'}} src={loan} alt="info4"></img>
                             <h5>Get a loan</h5>
                            </Col>
                         
                   </Row>
                </div>
                  
                  <div className={classes.fifthDivContainer} style={{marginTop: "2em"}}>
                     <Row className={classes.Block}>
                 
                    <h3 data-aos="fade-up" className={classes.Help} >
                      Find an account that suits you
                      </h3>
                      <div style={{height: "3em"}}></div>
                        <Col data-aos="fade-up" className={[classes.What, classes.Shadow].join(' ')} lg={3} md={3} xs={12} sm={12}>
                        
                          <h4>Checking with Interest</h4> <br />
                          <img style={{height: '3em'}} src={checking} alt="check"></img> <br />
                          <p>CHECKING ACCOUNT</p> <br />
                          <p>The perfect combination of saving and checking</p>
                          <Button variant="secondary">LEARN MORE</Button>{' '}
                       </Col>
                     
                      <Col data-aos="fade-up" className={[classes.What, classes.Shadow].join(' ')} lg={3} md={3} xs={12} sm={12}>
                        
                          <h4>Premier Money Making Account</h4> <br />
                          <img style={{height: '3em'}} alt="ch" src={checking}></img> <br />
                          <p>SAVINGS ACCOUNT</p> <br />
                          <p>The higher your balance the more you earn</p>
                          <Button variant="secondary">LEARN MORE</Button>{' '}

                      </Col>
                    
                      <Col data-aos="fade-up" className={[classes.What, classes.Shadow].join(' ')} lg={3}  md={3} xs={12} sm={12}>
                        
                          <h4>Prosperity Offshore Interest Account</h4> <br />
                          <img style={{height: '3em'}} src={checking} alt="bre"></img> <br />
                          <p>OFFSHORE ACCOUNT</p> <br />
                          <p>Earn interest and access your money locally and internationally</p>
                          <Button variant="secondary">LEARN MORE</Button>{' '}

                      </Col>
                     
                   </Row>
                  </div>
                 
                  <Container>
                 <Row style={{marginTop: '7em', display: "flex", height: "40em", justifyContent: "center"}}>
                  
                      <Col data-aos="fade-right" style={{height: "40em"}} className={classes.second} sm={12} xs={12} md={7}>
                       
                          {/* <SlideInDown> */}
                          <Row>
                            <Col xs={12} md={12}>
                              <Row>   
                                  <Col xs={6} md={12}>
                                    <h4 style={{color: "purple"}}>Finance Planning</h4>
                                    <h2>MANAGEMENT AND CONTROL EXPERTISE THAT GETS DOWN TO BUSINESS.</h2>
                                    <col></col>
                                    <p style={{textAlign: "left"}}>
                                    At Ansel Bank, you will benefit from innovative problem solving, decision-making and knowledge that only years of experience can bring. These qualities help us meet your special, and sometimes complex, lending and investing needs in extraordinary ways.
                                    </p>
                                  </Col>
                                  <Col style={{width: "100%", textAlign: "left"}} xs={6} md={12}>
                                            <Accordion >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                              >
                                                <Typography style={AccordionHead}>Savings Account</Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Typography style={MuiTypography_body1}>
                                                you can be sure that you will always have one of the market's best bank interest rates on your deposited funds. Of course, it is free to establish a savings account when you have an account with us.
                                                </Typography>
                                              </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                              >
                                                <Typography style={AccordionHead}>Global Liquidity</Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Typography style={MuiTypography_body1}>
                                                Access experience and solutions to help optimize your cash.you need to simplify the management of your cash positions and requirements. Our experienced specialists work with you to understand your needs and provide insights and solutions to help you reach your global and local objectives.
                                                </Typography>
                                              </AccordionDetails>
                                            </Accordion>
                                  </Col>
                              </Row>
                            </Col>


                            
                          </Row>

                          {/* </SlideInDown> */}
                         
                          
                       
                        
                      </Col>

                      <Col data-aos="fade-left" className={[classes.lastImage, classes.img].join(' ')} sm={12} xs={12} md={4}>
                        <img style={{height: '70%'}} alt="insp" src={mobile} />
                        
                      </Col>
                      
                   </Row>
                   </Container>


                  
                  
                  
                  <Footer />
                {/* </div>
                */}
            </Aux>
        );
    }

}

const MuiTypography_body1 = {
    fontFamily: "inherit",
    textAlign: "left"
}

const AccordionHead = {
  fontFamily: "inherit"
}

export default Home;