import React from 'react';
import classes from './Details.module.css';
import {Row, Col,  Button, Form} from 'react-bootstrap';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import NumberFormat from 'react-number-format';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});

class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            MoreDetails: {
                home_address: '',
                ssn: '',
                mobile_phone: '',
                home_phone: '',
            },
            errors: {
                home_address: '',
                ssn: '',
                mobile_phone: '',
                home_phone: '',
            },
            home_address_valid: false,
            ssn_valid: false,
            mobile_phone_valid: false,
            home_phone_valid: false,
            form_valid: false
            
        }
        this.SaveAndNext = this.SaveAndNext.bind(this);
    }

    handleChange(e) {
        let user = this.state.MoreDetails;
        const name = e.target.name;
        const value = e.target.value;
        user[name] = value
            
            this.setState({MoreDetails : {...user}}, () => {
                this.validateField(name, value)
            });
        
        
      }


    validateField(fieldName, value){
        // alert('i got here')
        let errors = this.state.errors;
        let home_address_valid = this.state.home_address_valid;
        let ssn_valid = this.state.ssn_valid;
        let mobile_phone_valid = this.state.mobile_phone_valid;
        let home_phone_valid = this.state.home_phone_valid;



        switch(fieldName) {
            
            case 'home_address' :
                home_address_valid = value.length >= 5;
                errors.home_address = home_address_valid ? '' : 'home address is compulsory';
                break; 
            case 'ssn' :
                 ssn_valid = value.length >= 5;
                 errors.ssn = ssn_valid ? '' : 'ssn is compulsory';
                 break;    
            case 'mobile_phone' :
                mobile_phone_valid = value.length >= 14 ;
                errors.mobile_phone = mobile_phone_valid ? '' : 'mobile phone is compulsory';
                break; 
            case 'home_phone':
                // email_valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                home_phone_valid = value.length >= 14;
                errors.home_phone = home_phone_valid ? '' : 'home phone number is compulsory';
                break;
                default:
                break;     
        }
    
        this.setState({
          errors: errors,
          home_address_valid,
          ssn_valid,
          mobile_phone_valid,
          home_phone_valid,
        },  this.validateForm);

       
    }

    validateForm() {

        this.setState({
            form_valid: this.state.home_address_valid && this.state.home_address_valid && this.state.mobile_phone_valid && this.state.home_phone_valid
        })
    }

    SaveAndNext(e) {
        e.preventDefault()
        this.props.saveStep(this.state.MoreDetails, this.props.history);
    }

   
    render() {
        // console.log('more', this.state.MoreDetails)
        return(
            <Aux>
                 <div data-aos="fade-up" className={classes.Container}>

                 <div className={classes.Details}> 
                  
                <h4 className={classes.DetailsHeader}>More Details</h4>
                <hr></hr>
              <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Home Address</Form.Label>
                            <Form.Control  type="text" name="home_address" placeholder="Home Address" value={this.state.MoreDetails.home_address}  onChange={(e) => {this.handleChange(e)}} />
                        </Form.Group>
                        <small><span className={classes.Up}>{this.state.errors.home_address}</span></small>
                        <Row>
                            <Col md={6} style={{marginTop: '1em'}}>
                                 <span>Mobile Number</span>
                            <NumberFormat className={classes.NumberInput} format="(###) ###-####" onChange={(e) => {this.handleChange(e)}}  name="mobile_phone" value={this.state.MoreDetails.mobile_phone} allowEmptyFormatting />
                            <small><span className={classes.Up}>{this.state.errors.mobile_phone}</span></small>
                            </Col>
                           
                            <Col md={6} style={{marginTop: '1em'}}>
                                <span>Home Phone</span>
                            <NumberFormat className={classes.NumberInput} format="+1 (###) ###-####" onChange={(e) => {this.handleChange(e)}}  name="home_phone" value={this.state.MoreDetails.home_phone} allowEmptyFormatting />
                            <small><span className={classes.Up}>{this.state.errors.home_phone}</span></small>
                            </Col>
                        </Row>
                        
                        <Form.Group style={{marginTop: '2em'}} controlId="formBasicPassword">
                               <Form.Label>Social Security Number</Form.Label>
                               <Form.Control  type="text" name="ssn" placeholder="ssn" value={this.state.MoreDetails.ssn}  onChange={(e) => {this.handleChange(e)}} />
                        </Form.Group>
                        <small><span className={classes.Up}>{this.state.errors.ssn}</span></small>


                        <div style={{display: 'flex', justifyContent: 'center'}}>
                           <Button variant="warning"  className={classes.DetailsBtn} disabled={!this.state.form_valid} onClick={this.SaveAndNext}>
                               Next
                            </Button>
                            </div>
              </Form>    



              </div>
              </div>
                  
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveStep: (data, history) => dispatch(actions.saveStepTwo(data, history))
    }
}



export default connect(null, mapDispatchToProps) (Details);