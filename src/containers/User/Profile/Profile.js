import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';
import classes from './Profile.module.css';
import BreadCrumb from '../../../components/UI/BreadCrumb/BreadCrumb';
import profile from '../../../assets/icons/profile.png';
import { Row, Col, Button, Form} from 'react-bootstrap';
// import john_doe from '../../../assets/images/john_doe.jpeg';
import {connect} from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
import * as config from '../../../config';
// import {getToken} from '../../../utils/cache'

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});




class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            editProfile: false,
        }

        this.onChange = this.onChange.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this)

    }
   
    closeEditWindow = () => {
        this.setState({editProfile: false})
    }
    openEditWindow = () => {
        this.setState({editProfile: true})
    }

    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    uploadPicture = () => {
        this.props.uploadPic(this.props.user._id, this.state.file)
    }
   render() {
       console.log('Image', this.state.file)
       const pageLogo = <img alt="Profile" style={{height: '3em'}} src={profile}></img>
       const url = config.BACKEND_URL + this.props.user.photo
     return (
         <Aux>
            <div className={classes.Profile}>
                {/* <div className={classes.Side}>
                    <Sidebar></Sidebar>
                </div> */}
                <BreadCrumb pageName='Profile' pageLogo={pageLogo} />
                
                <Modal show={this.state.editProfile} modalClosed={this.closeEditWindow}>
                       <h4 style={{borderBottom: '1px solid #dcdcdc', paddingBottom: '.5em'}}>Edit Profile</h4>

                       <Form >


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Beneficiary Name</Form.Label>
                            <Form.Control type="text" name="ben_name" placeholder="name"  value={this.state.beneficiary_name} onChange={( event ) => this.setState({ beneficiary_name : event.target.value } )} />
                            <Form.Text className="text-muted">
                            Name of Beneficiary Here
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control  type="text" name="ben_bank_name" placeholder="bank name"  value={this.state.beneficiary_bank_name}  onChange={( event ) => this.setState({ beneficiary_bank_name : event.target.value } )}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control  type="text" name="ben_account_number" placeholder="account number"  value={this.state.beneficiary_account_number}  onChange={( event ) => this.setState({ beneficiary_account_number : event.target.value } )}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Bank Address</Form.Label>
                            <Form.Control  type="text" name="bank_address" placeholder="bank address"  value={this.state.bank_address} onChange={( event ) => this.setState({ bank_address : event.target.value } )} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control  type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={( event ) => this.setState( { phone : event.target.value })}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control  type="number" step="0.01" min="0" name="amount" placeholder="0.00" value={this.state.amount} onChange={( event ) => this.setState( { amount : event.target.value })}/>
                            <Form.Text className="text-muted">
                                Money Format must be in 0.00
                            </Form.Text>
                        </Form.Group>

                    
                        <Button >Submit</Button>
                        </Form>

                    </Modal>


                <div data-aos="fade-up" className={classes.Content}>
                    <Row style={{paddingTop: '7em'}}>
                        <Col xs={6} md={3} style={{border: '1px solid yellow'}}>
                        <img src={url} style={{height: '10em'}} alt="profile"></img>
                        <Form style={{marginTop: '.5em'}}>
                        <Form.Group controlId="formBasicPassword" enctype="multipart/form-data">
                            <Form.Control  type="file" name="image" placeholder="Upload Image" accept="image/*"   value={this.state.image} onChange={this.onChange} />
                            <Button style={{marginTop: '.4em'}} onClick={this.uploadPicture}>upload</Button>
                        </Form.Group>
                        </Form>
                        </Col>
                        <Col xs={6} md={8} style={{ marginLeft: '4em', boxShadow: '0px 4px 26px rgba(0, 0, 0, 0.06)'}}>
                            <Row >
                               <Col xs={12} md={12} className={classes.ProfileInfo}>
                                   <span style={{textShadow: '0px 4px 26px rgba(0, 0, 0, 0.06)', fontWeight: 'bold'}}>
                                   Contact Information
                                   </span>
                                   
                                   </Col>
                                <Col xs={12} md={9} className={classes.innerCol}>
                                <span> <b>Name</b>:  {this.props.user.first_name} {this.props.user.last_name}</span><br /><br />
                                <span><b>Email</b>: {this.props.user.email}</span><br /><br />
                                <span><b>Home Address</b>: {this.props.user.home_address}</span><br /><br />
                                <span><b>Mobile Phone</b>: {this.props.user.mobile_phone}</span><br /><br />
                                <span><b>Home Phone</b>: {this.props.user.home_phone}</span><br /><br />
                                </Col>
                                <Col xs={12} md={3} className={classes.innerCol}>
                                <Button onClick={(event => this.openEditWindow())}>Edit Profile</Button>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                </div>
            </div>
         </Aux>
     );
   }

}


const mapStateToProps = state => {
    return {
        user: state.question.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadPic: (user_id, file) => dispatch(actions.uploadPicture(user_id, file))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);