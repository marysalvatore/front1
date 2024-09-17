import React from 'react';
import classes from './AdminDashboard.module.css';
import dashboard from '../../../assets/icons/dashboard_big.png';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BreadCrumb from '../../../components/UI/BreadCrumb/BreadCrumb';
import {Row, Col, Button, Form, Table} from 'react-bootstrap';


class AdminDashboard extends React.Component{
   
    render() {

       const image = <img src={dashboard} className={classes.BreadCrumpLogo}  alt="dashboard"></img>;
        return (
            <Aux>
                <div className={classes.Dashboard}>
                <BreadCrumb pageName='Admin Dashboard' pageLogo={image} />

                <Row style={{paddingTop: '7em', marginLeft: '25%'}}>

                    <p >All Users</p> <br />
                    <Col xs={12} md={10} >
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Beneficiary Name</th>
                                    <th>bank name</th>
                                    <th>account_no</th>
                                    <th>amount</th>
                                    <th>date</th>
                                    <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {/* {transactions} */}
                                    
                                </tbody>
                                </Table>
                            </Col>
                                    

                </Row>
                </div>
            </Aux>
         )
    }
}

export default AdminDashboard;