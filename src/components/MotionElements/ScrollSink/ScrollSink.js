import React from 'react';


class WindowScrollSink extends React.Component {
    componentDidUpdate (prevProps) {
      if (prevProps.scrollTop !== this.props.scrollTop) {
        document.scrollingElement.scrollTop = this.props.scrollTop
      }
    }
  
    render () {
      return null
    }
  }

  export default WindowScrollSink