import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import layoutCss from './DashboardLayout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// import classes from './Layout.module.css'
import DropDownLinks from '../../components/Navigation/DropDownLinks/DropDownLinks';


class DashboardLayout extends React.Component {

    state = {
        showSideDrawer: false
    }

    componentDidMount() {
        console.log('user', this.props.user)
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    toggleSideDrawer = () => {
        this.setState((prevState) => {
          return  {showSideDrawer: !prevState.showSideDrawer}
        })
    }
   render() {
    // const toolbar = this.props.children.props.path === '/' ? <p className={classes.LoginHead}>Welcome Back!</p> : 

    return <Aux>
            {/* <Toolbar  toggle={this.toggleSideDrawer}  /> */}
            <DropDownLinks /> 
        <SideDrawer open={this.state.showSideDrawer}  closed={this.sideDrawerClosedHandler} />
        <main className={layoutCss.Content}>
            {this.props.children}
        </main>
    </Aux>
   }
}

export default DashboardLayout;