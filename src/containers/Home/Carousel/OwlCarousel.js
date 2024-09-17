import React, { useState } from 'react';
import {Carousel, Button} from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import './OwlCarousel.css';
import zimmer from '../../../assets/images/zimmerman.png';
import newOne from '../../../assets/images/drawing.jpg';
import russ from '../../../assets/images/russ.png';
import better from '../../../assets/images/better.jpg';
import rewards from '../../../assets/images/rewards.png';
import { useSpring, animated } from "react-spring";


function OwlCarousel(props) {
  const letters = 'Please remember that Ansel Bank will never text or email you requesting personal information';


  const [key, setKey] = useState(1);


  const scrolling = useSpring({
    from: { transform: "translate(-200%,0)" },
    to: { transform: "translate(200%,0)"},
    config: { duration: 8000 },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    }
  });
 

    return (
        <div className="Home">
               <div key={key} className="topOfCarousel">
                <animated.div style={scrolling}>{letters}</animated.div>
              </div>
                <Carousel >
                  
                   {/* <Carousel.Item className="slide">
                    <img
                      src={zimmer}
                      alt="First slide"
                    />
                    <Carousel.Caption data-aos="zoom-in"  className="Caption">
                      <span>Ansel Bank Welcomes Walker Zimmerman as Brand Ambassador</span>
                      <br />
                      <br />
                      <p>Ansel Bank is proud to announce that center-back for the Nashville Soccer Club and US Men’s National Team, Walker Zimmerman, has joined the Ansel Bank team as a brand ambassador.</p>
                      <Button href="/auth/register" className="btnStyle">Walker Zimmerman</Button>
                    </Carousel.Caption>
                  </Carousel.Item> */}
                  
                  
                    <Carousel.Item className="slide">
                    <img
                      src={newOne}
                      alt="second slide"
                       />

                    <Carousel.Caption data-aos="zoom-in" className="Caption">
                      <span>Your Next Move Is Here</span>
                      <br />
                      <br />
                      <p>Whether you’re looking for your first house, need one with a little more space or are searching for the perfect vacation getaway, Ansel Bank Mortgage Lending is ready to help – and to help you feel right at home.</p>
                      <Button href="/auth/register" className="btnStyle">Ansel Bank Mortgage Lending</Button>
                    </Carousel.Caption>
                  </Carousel.Item>


                  <Carousel.Item className="slide">
                    <img
                      src={russ}
                      alt="second slide"
                       />

                    <Carousel.Caption data-aos="zoom-in" className="Caption">
                      <span>Golf is challenging, but banking is easy with Ansel Bank.</span>
                      <br />
                      <br />
                      <p>See why LPGA Tour Golfer Ally Ewing and PGA Tour Golfer Russell Henley depend on Ansel Bank Mobile to manage money.</p>
                      <Button href="/auth/register" className="btnStyle">Learn more about Ansel Mobile</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  

                  {/* <Carousel.Item className="slide">
                     <img
                      src={rewards}
                      alt="second slide"
                       />

                    <Carousel.Caption data-aos="zoom-in" className="Caption">
                      <span>Are you ready for Extra? </span>
                      <br />
                      <br />
                      <p>Check balances, access more than 450,000 nationwide deals, control your cards, manage your money, and more with a Rewards Extra checking account.</p>
                      <Button href="/auth/register" className="btnStyle">Get Ansel Bank Rewards Extra</Button>
                    </Carousel.Caption>
                  </Carousel.Item> */}

                  <Carousel.Item className="slide">
                    <img
                      src={better}
                      alt="second slide"
                       />

                    <Carousel.Caption data-aos="zoom-in" className="Caption">
                      <h1>A Better Way To Bank</h1>
                      <br />
                      <br />
                      <p>Everything you need to manage your money on your phone. Let the Ansel Bank Mobile app put the best of banking into the palm of your hand.</p>
                      <Button href="/auth/register" className="btnStyle">SIGN UP TODAY</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                 
                </Carousel>

               

                </div>
    );
}

export default OwlCarousel;