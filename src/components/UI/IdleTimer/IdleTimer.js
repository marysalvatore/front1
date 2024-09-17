import React from 'react';



class IdleTimer extends React.Component {
  constructor({timeout, onTimeout, logoutHandler}) {
      super(timeout, onTimeout)
      this.timeout = timeout;
      this.onTimeout = onTimeout;
      this.logoutHandler = logoutHandler

      this.eventHandler = this.updateExpiredTime.bind(this);
      this.tracker();
      this.startInterval()
  }

  startInterval() {
    this.updateExpiredTime()
   
    this.interval = setInterval(() => {
        const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
        if(expiredTime < Date.now()) {
              if(this.onTimeout) {
                  this.onTimeout()
                  this.logoutHandler()
                  this.cleanUp()
              }
        }
    }, 1000)

}

  updateExpiredTime() {
      localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000)
  }

  tracker() {
      window.addEventListener("mousemove", this.eventHandler);
      window.addEventListener("mouseclick", this.eventHandler);
      window.addEventListener("keydown", this.eventHandler)
  }

  cleanUp() {
      clearInterval(this.interval);
      window.removeEventListener("mousemove", this.eventHandler);
      window.removeEventListener("mouseclick", this.eventHandler);
      window.removeEventListener("keydown", this.eventHandler)
  }

  



}



export default IdleTimer