const { Component, createElement, DOM } = React;
const { Motion, spring, presets } = ReactMotion;

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollTop: 0 }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseDown(e) {
    this.setState(prev => {
      return {
        scrollTop: 2000
      }
    })
  }

  handleMouseUp() {
    this.setState(() => {
      return { scrollTop: 0 }
    })
  }

  render () {
    return (
      <div>
        <div
          style={{ height: 2256, background: 'linear-gradient(to top, #3494E6 , #EC6EAD)',
                 textAlign: 'center'}}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onTouchEnd={this.handleMouseUp}
        >
          <h1 style={{
              color: 'white',
              fontFamily: 'sans-serif',
              paddingTop: 'calc((128px + 1vh + 1vw) / 3)',
              fontSize: 'calc((128px + 1vh + 1vw)/3)',
                align: 'center'
            }}>Hold Mouse Down To Scroll</h1>
           <h1 style={{
              color: 'white',
              fontFamily: 'sans-serif',
              paddingTop: 2000,
              fontSize: 'calc((128px + 1vh + 1vw)/3)',
                align: 'center'
            }}>Let go 😎</h1>
        </div> 
        <Motion
          style={{
            scrollTop: spring(this.state.scrollTop, presets.noWobble)
          }}
        >
          {currentStyles => {
            return <WindowScrollSink scrollTop={currentStyles.scrollTop} />
              
          }}
        </Motion>
      </div>
    )
  }
}


class WindowScrollSink extends Component {
  componentDidUpdate (prevProps) {
    if (prevProps.scrollTop !== this.props.scrollTop) {
      document.scrollingElement.scrollTop = this.props.scrollTop
    }
  }

  render () {
    return null
  }
}

ReactDOM.render(createElement(Content), document.getElementById('app'))
