import React from 'react';
import classes from './Register.module.css';
import { Row, Col,  Button, Form} from 'react-bootstrap';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import axios from '../../../axios-url';
import {withRouter} from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Link} from 'react-router-dom';
import validator from 'validator'
import {TextField} from '@material-ui/core';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});



class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            RegisterDetails: {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            },
            accounts: [],
            errors: {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            },
            firstname_valid: false,
            lastname_valid: false,
            username_valid: false,
            email_valid: false,
            password_valid: false,
            confirm_password_valid: false,
            form_valid: false


        }

        this.Selected = this.Selected.bind(this);
        this.Remove = this.Remove.bind(this);
        this.SaveAndNext = this.SaveAndNext.bind(this);
        this.validateForm = this.validateForm.bind(this);
        // this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount() {
        this.props.getAllAccountTypes()
    }


    SaveAndNext() {
        // alert('i am clicked ohh!!');
        let payload = {
            ...this.state.RegisterDetails,
            accounts: this.state.accounts
        }
        this.props.saveStep(payload, this.props.history)
    }

    handleChange(e) {
        let user = this.state.RegisterDetails;
        const name = e.target.name;
        const value = e.target.value;
        user[name] = value

            this.setState({RegisterDetails : {...user}}, () => {
                this.validateField(name, value)
            });


      }


      validateField(fieldName, value){
        // alert('i got here')
        let errors = this.state.errors;
        let firstname_valid = this.state.fistname_valid;
        let lastname_valid = this.state.lastname_valid;
        let username_valid = this.state.username_valid;
        let email_valid = this.state.email_valid;
        let password_valid = this.state.password_valid;
        let confirm_password_valid = this.state.confirm_password_valid;
        let input = this.state.RegisterDetails


        switch(fieldName) {

            case 'first_name' :
                firstname_valid = value.length >= 3;
                errors.firstname = firstname_valid ? '' : 'firstname is too short';
                this.setState({firstname_valid});
                break;
            case 'last_name' :
                 lastname_valid = value.length >= 3;
                 errors.lastname = lastname_valid ? '' : 'lastname is too short';
                 break;
            case 'username' :
                username_valid = value.length >= 3;
                errors.username = username_valid ? '' : 'username is too short';
                break;
            case 'email':
                // email_valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                email_valid = validator.isEmail(value);
                errors.email = email_valid ? '' : 'Please enter a valid email address.';
                break;
            case 'password' :
                password_valid = value.length >= 3;
                errors.password = password_valid ? '' : 'please enter password';
                break;
            case 'confirm_password' :
                confirm_password_valid = value.length >= 3;
                errors.confirm_password = confirm_password_valid ? '' : 'please enter confirm password';
                if(input.password !== 'undefined' && input.confirm_password !== 'undefined') {
                    if (input.password !== input.confirm_password) {
                    confirm_password_valid = false;
                    errors.confirm_password = "Passwords don't match.";
                  }
                }

                break;
                default:
                break;
        }

        this.setState({
          errors: errors,
          lastname_valid: lastname_valid,
          username_valid: username_valid,
          email_valid: email_valid,
          password_valid: password_valid,
          confirm_password_valid: confirm_password_valid
        },  this.validateForm);


    }

    validateForm() {

        this.setState({
            form_valid: this.state.firstname_valid && this.state.lastname_valid && this.state.username_valid && this.state.email_valid && this.state.password_valid && this.state.confirm_password_valid
        })
    }

    Selected(selectedItem) {
        console.log(selectedItem)
        let selected ;
        selected = selectedItem.map(select => {
            return select._id
        })
        this.setState({accounts: selected });
    }

    Remove(selectedItem) {
        let available_accounts = [...this.state.accounts];
        let filtered;
        if(available_accounts.length >= 1)
        filtered = available_accounts.filter(account => {
            return account !== selectedItem[0]._id
        })

        this.setState({accounts: filtered });


    }

    render() {
        // console.log('confirm pass',this.state.confirm_password_valid);

        // console.log('Mobile',this.state.RegisterDetails.mobile_phone);

        return(
            <Aux>
                 <div data-aos="fade-up" className={classes.Container}>

                   <div className={classes.Register}>
                   <h4 className={classes.Reg}>Sign Up</h4>

                       {/* <Spinner></Spinner> */}


                       <hr></hr>
                   <Form >
                            <span>Select  Accounts</span> <br></br>
                            <Multiselect
                             selectedValues={this.props.account_types._id}
                             options={this.props.account_types}
                             displayValue="name"
                             onSelect={this.Selected}
                             onRemove={this.Remove}
                             placeholder="Select Accounts"

                          />
                          <small><span>you can select multiple account types</span></small>

                             <Row>
                                 <Col md={6} sm={12} xs={12}>
                                 {/* <Form.Group style={{marginTop: "0.5em"}} controlId="formBasicEmail">
                                    <Form.Label>firstname</Form.Label>
                                    <Form.Control className={this.state.errors.firstname ? classes.Error : ''} type="text" name="first_name" placeholder="firstname" value={this.state.RegisterDetails.first_name}  onChange={(e) => {this.handleChange(e)}} />
                                </Form.Group> */}

                                <TextField
                                id="firstname"
                                label="firstname"
                                name="first_name"
                                style={{width: "100%", marginTop: "1em"}}
                                className={this.state.errors.firstname ? classes.Error : ''}
                                variant="outlined"
                                value={this.state.RegisterDetails.first_name}
                                onChange={(e) => {this.handleChange(e)}}
                                />
                                <small><span className={classes.Up}>{this.state.errors.firstname}</span></small>
                                 </Col>

                            <Col md={6} sm={12} xs={12}>
                                 {/* <Form.Group style={{marginTop: "0.5em"}} controlId="formBasicPassword">
                                    <Form.Label>lastname</Form.Label>
                                    <Form.Control className={this.state.errors.lastname ? classes.Error : ''}  type="text" name="last_name" placeholder="lastname" value={this.state.RegisterDetails.last_name}  onChange={(e) => {this.handleChange(e)}} />
                                </Form.Group> */}

                            <TextField
                                id="lastname"
                                label="lastname"
                                name="last_name"
                                style={{width: "100%", marginTop: "1em"}}
                                className={this.state.errors.lastname ? classes.Error : ''}
                                variant="outlined"
                                value={this.state.RegisterDetails.last_name}
                                onChange={(e) => {this.handleChange(e)}}
                                />
                                <small><span className={classes.Up}>{this.state.errors.lastname}</span></small>
                                 </Col>
                             </Row>


                           <div>


                           </div>


                            <div>
                                {/* <Form.Group controlId="formBasicPassword">
                               <Form.Label>username</Form.Label>
                               <Form.Control className={this.state.errors.username ? classes.Error : ''}  type="text" name="username" placeholder="Username" value={this.state.RegisterDetails.username}  onChange={(e) => {this.handleChange(e)}} />
                           </Form.Group> */}
                            <TextField
                                id="username"
                                label="username"
                                name="username"
                                style={{width: "100%", marginTop: "1em"}}
                                className={this.state.errors.username ? classes.Error : ''}
                                variant="outlined"
                                value={this.state.RegisterDetails.username}
                                onChange={(e) => {this.handleChange(e)}}
                                />

                           <small><span className={classes.Up}>{this.state.errors.username}</span></small>

                            </div>


                            <div>
                            <TextField
                                id="email"
                                label="email"
                                name="email"
                                style={{width: "100%", marginTop: "1em"}}
                                className={this.state.errors.email ? classes.Error : ''}
                                variant="outlined"
                                value={this.state.RegisterDetails.email}
                                onChange={(e) => {this.handleChange(e)}}
                                />
                           <small><span className={classes.Up}>{this.state.errors.email}</span></small>

                            </div>


                            <Row>
                                <Col md={6} sm={12} xs={12}>

                            <TextField
                                id="password"
                                label="password"
                                name="password"
                                type="password"
                                style={{width: "100%", marginTop: "1em"}}
                                className={this.state.errors.password ? classes.Error : ''}
                                variant="outlined"
                                value={this.state.RegisterDetails.password}
                                onChange={(e) => {this.handleChange(e)}}
                                />
                                <small><span className={classes.Up}>{this.state.errors.password}</span></small>

                                </Col>

                                <Col md={6} sm={12} xs={12}>
                            <TextField
                                id="confirm_password"
                                label="confirm password"
                                name="confirm_password"
                                type="password"
                                style={{width: "100%", marginTop: "1em"}}
                                className={this.state.errors.confirm_password ? classes.Error : ''}
                                variant="outlined"
                                value={this.state.RegisterDetails.confirm_password}
                                onChange={(e) => {this.handleChange(e)}}
                                />
                                    <small><span className={classes.Up}>{this.state.errors.confirm_password}</span></small>

                                </Col>
                            </Row>



                           {/* <Form.Group controlId="formBasicPassword">
                               <Form.Label>Mobile Phone Number</Form.Label>
                               <Form.Control  type="phone" name="mobile_phone" placeholder="Mobile Phone Number" value={this.state.RegisterDetails.mobile_phone}  onChange={(e) => {this.handleChange(e)}} />
                           </Form.Group>

                           <Form.Group controlId="formBasicPassword">
                               <Form.Label>Home Phone Number</Form.Label>
                               <Form.Control  type="tel" name="home_phone" placeholder="Home Phone Number" value={this.state.RegisterDetails.home_phone}  onChange={(e) => {this.handleChange(e)}} />
                           </Form.Group> */}



                           {/* <InputGroup>

                               <InputGroup.Radio aria-label="Radio button for following text input" />

                              <span className={classes.MoveLeft}>Remember Me ?</span>
                           </InputGroup> */}
                           <div style={{display: 'flex', justifyContent: 'center'}}>
                           <Button variant="warning"  className={classes.RegisterBtn} disabled={!this.state.form_valid} onClick={this.SaveAndNext}>
                               Next
                            </Button>
                            </div>

                           </Form>
                           <div style={{textAlign: 'center', marginTop: '1em'}}>
                              <span style={{textAlign: 'center', marginTop: '1em'}}>Already have an account ? <Link to="/auth/login">click here</Link></span>

                           </div>
                   </div>
               </div>
            </Aux>
        );
    }

}


const mapStateToProps =  state => {
    return {
        account_types: state.transactions.account_types,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAccountTypes : () => dispatch(actions.getActionTypes()),
        saveStep: (data, history) => dispatch(actions.saveStepOne(data, history))
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Register));
