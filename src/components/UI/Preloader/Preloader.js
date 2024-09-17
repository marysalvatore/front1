import classes from './Preloader.module.css';
import React from 'react';
// import ReactLoading from 'react-loading';
import Lottie from 'react-lottie';
import * as location from '../../../1055-world-locations.json';

class Preloader extends React.Component {

    constructor(props){
        super(props)
        this.state={
            
        }
    }

    render(){
   
        
        let defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: location.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

    
          
    
        return(
            <div className={classes.Pre} >
                {/* <ReactLoading text="connecting" type="bubbles" color="red" height={'20%'} width={'20%'} /> */}
    
                <Lottie options={defaultOptions}
                  height={300}
                  width={300}/>
    
    
                {/* isStopped={this.state.isStopped} */}
                  {/* isPaused={this.state.isPaused} */}
            </div>
        );
    }
   
}

export default Preloader;