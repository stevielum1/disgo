import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Main extends React.Component {
  render() {
    if (this.props.loading) return null;
    return (
      <ReactCSSTransitionGroup
        transitionName="main"
        transitionAppear={true}
        transitionAppearTimeout={5000}
        transitionEnter={false}
        transitionLeave={false} >
        <div className="main-container">
          <h2>Welcome to</h2>
          <h1>Disgo</h1>
          <p>Disgo is a clone of the awesome <a href="https://discordapp.com/">Discord</a> app!</p>
          <p>See the Disgo github repo <a href="https://github.com/stevielum1/disgo">here</a>!</p>
          <p>Note: This site is purely for educational purposes. I am not affiliated with Discord in any way.</p>
          <p>If Discord would like me to remove the logo or color scheme, please shoot me an email at <a href="mailto:steven.lum@live.com">steven.lum@live.com</a> and I'll remove it as soon as I can.</p>
          <a href="https://discordapp.com/">
            <img src="https://s3-us-west-1.amazonaws.com/disgo-dev/server_img.png" />
          </a>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

export default Main;
