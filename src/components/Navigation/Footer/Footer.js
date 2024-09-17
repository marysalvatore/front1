import React from 'react';
import classes from './Footer.module.css';
import {Container, Row, Col} from 'react-bootstrap'

const Footer = (props) => {
 return (
    
<div className={classes.SiteFooter}>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <h6>About</h6>
            <p class="text-justify"> 
            <i>The Ansel Bank & Company</i> is an American multinational financial services company with corporate headquarters in San Francisco, Newyork , California, operational headquarters in Manhattan, and managerial offices throughout the United States and overseas.
            </p>
          </Col>

          <Col xs={6} md={3}>
            <h6>Categories</h6>
            <ul className={classes.FooterLinks}>
              <li><a href="/auth/register">Savings</a></li>
              <li><a href="/auth/register">Offshore</a></li>
              <li><a href="/auth/register">Current</a></li>
              {/* <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li> */}
              <li><a href="/auth/register">Services</a></li>
              
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6>Quick Links</h6>
            <ul className={classes.FooterLinks}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container>
        <Row>
          <Col md={8} sm={6} xs={12}>
            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by  <span><a href="#">Ansel Bank</a></span>.
            </p>
          </Col>

          <Col md={4} SM={6} xs={12}>
            <ul className={classes.SocialIcons}>
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </Col>
        </Row>
      </Container>
</div>
 );
}





export default Footer