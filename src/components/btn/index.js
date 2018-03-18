import React from 'react';

class Btn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggle: true};
    this.eventHandler = this.eventHandler.bind(this);
  }
  eventHandler(event) {
    console.log("???")
    this.setState((prevState) => ({
        toggle: !prevState.toggle
      })
    );
  }
  render() {
    return(
      <div>
        <button onClick={this.eventHandler}>{this.state.toggle ? 'Click Me' : 'Reset'}</button>
      </div>
    );
  }
}

export default Btn;
