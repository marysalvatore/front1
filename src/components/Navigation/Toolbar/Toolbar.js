import React from 'react';
import Logo from '../Logo/Logo'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
// import {Dropdown} from 'react-bootstrap';
// import BreadCrumb from '../../UI/BreadCrumb/BreadCrumb';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import {withRouter } from 'react-router-dom';
import search from '../../../assets/images/search.png'
import about from '../../../assets/images/about.png';
import phone from '../../../assets/images/phone.png';
import investor from '../../../assets/images/investor.png';
import careers from '../../../assets/images/careers.png';
import LoginRegisterNavs from '../NavigationItems/LoginRegisterNavs/LoginRegisterNav'

// import NavigationItem from './NavigationItem/NavigationItem'



class Toolbar extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        scroll: false,
        toolbar: classes.Toolbar
      }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
        this.checkUrlForPageColor()
    }
  

    componentDidUpdate(prevProps) {
      if(prevProps.location.pathname !== this.props.location.pathname) {
        // console.log('prev', prevProps.location.pathname);
        // console.log("current", this.props.location.pathname);
        // console.log(false);
        prevProps.location.pathname = this.props.location.pathname
        this.checkUrlForPageColor()
      }

      
    }


    checkUrlForPageColor = () => {
      if(this.props.location.pathname !== '/') {
        this.setState({toolbar: classes.ToolbarActive})
      }
    }


    listenScrollEvent = e => {
      this.checkUrlForPageColor()

      if (window.scrollY > 400) {  
        this.setState({toolbar: classes.ToolbarActive})
      } else  if(this.props.location.pathname !== '/') {
        this.setState({toolbar: classes.ToolbarActive})
      }else {
        this.setState({toolbar: classes.Toolbar})
      }
      
     
    }
  
  

    render() {
    return (
      <Aux>
        
        <header className={this.state.toolbar} >
            <DrawerToggle toggled={this.props.toggle} />
            
            <Logo isAuth={this.props.isAuth}/>  
          
            
            {/* <nav className={classes.DesktopOnly}> */}
              {/* Header */}
            {/* </nav> */}

            <nav className={classes.DesktopOnly}>
              <NavigationItems />
            </nav>
            

           <nav className={classes.topRight}>
             <div className={classes.topDiv}>
               <div className={classes.options}><img className={classes.Img} src={search} alt="search" /> Search</div>
               <div className={classes.options}><img className={classes.Img} src={about} alt="about" /> About</div>
               <div className={classes.options}><img className={classes.Img} src={investor} alt="investor" /> Investors</div>
               <div className={classes.options}><img className={classes.Img} src={careers} alt="careers" /> Careers</div>
               <div className={classes.options}><img className={classes.Img} src={phone} alt="phone" /> +1-555-245-5378</div>
             </div>
             <div className={classes.downDiv}>
                <ul className={classes.Nav}>
                <LoginRegisterNavs  link="/auth/login" exact>Login </LoginRegisterNavs>
                </ul>

                <ul className={classes.Nav}>
                <LoginRegisterNavs  link="/auth/register" exact>Apply</LoginRegisterNavs>
                </ul>
             </div>
           </nav>
            
            {/* <nav className={classes.DesktopOnly}>
            {auth}
            </nav> */}
            
        </header>
        
      </Aux>
        
    )
    }
    
   
}

export default withRouter(Toolbar);