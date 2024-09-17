import React from 'react';
import classes from './otp.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import axios from '../../axios-url';
// import * as actionTypes from '../../store/actions/actionsTypes';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {TextField} from '@material-ui/core';
import {  Button} from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});

// import {logoutUser} from '../../../utils/cache'


class Otp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authLoading: false,
          isAuth: false,
          otp: 0
      }
      this.sendOTP = this.sendOTP.bind(this)
      }

    handleChange(e) {
        let otp = this.state.otp;
        otp = e.target.value
        this.setState({otp : otp});
      }

      sendOTP() {
        this.props.onSendAnswer(this.state.otp, this.props.history);

      }

    render() {
        console.log('history', this.props.history)
        const spin = this.props.authLoading ? <Spinner /> : null;
        return (
         <Aux>

            {/* {spin} */}
            <div data-aos="fade-up" className={classes.Container}>

                <div className={classes.Login}>

                    <h4>{this.props.otp.access_question}</h4>
                    <hr></hr>
                    <form noValidate autoComplete="off">

                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label>One Time Password</Form.Label>
                            <Form.Control type="number" name="otp" placeholder="OTP?" value={this.state.otp}  onChange={(e) => {this.handleChange(e)}} />
                        </Form.Group> */}

                        <TextField
                          id="otp"
                          label="One Time password"
                          name="otp"
                          type="number"
                          style={{width: "100%"}}
                          variant="outlined"
                          value={this.state.otp}
                          onChange={(e) => {this.handleChange(e)}}
                          />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        {/* <Button variant="warning"  onClick={this.sendOTP} className={classes.LoginBtn}>
                            Submit
                         </Button> */}

                         <Button className={classes.otpButton}  onClick={this.sendOTP}>
                            Submit
                        </Button>
                         </div>

                        </form>
                </div>
            </div>
            </Aux>
        );
    }

}

const mapStateToProps = props => {
    return {
        otp: props.question.otp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendAnswer : (access, history) => dispatch(actions.sendOTP(access, history))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Otp));