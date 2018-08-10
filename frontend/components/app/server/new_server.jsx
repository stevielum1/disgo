import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CreateServerFormContainer from './create_server_form_container';
import JoinServerFormContainer from './join_server_form_container';

class NewServer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: ""
    };
  }

  updateContent(type) {
    this.setState({ content: type })
  }

  render() {
    let content;
    if (this.state.content === "create") {
      content = createContent();
    } else if (this.state.content === "join") {
      content = joinContent();
    } else {
      content = (
        <div>
          <h1>Oh, another server huh?</h1>
          <div className="new-server-content">
            <div className="new-server-create"
              onClick={() => this.updateContent('create')} >
              <button>Create a Server</button>
            </div>
            <div className="new-server-join"
              onClick={() => this.updateContent('join')}>
              <button>Join a Server</button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="new-server-container">
        {content}
      </div>
    )
  }
};

const createContent = () => (
  <ReactCSSTransitionGroup
    transitionName="new-server"
    transitionAppear={true}
    transitionAppearTimeout={250}
    transitionEnter={false}
    transitionLeave={false} >
    <CreateServerFormContainer />
  </ReactCSSTransitionGroup>
)

const joinContent = () => (
  <ReactCSSTransitionGroup
    transitionName="new-server"
    transitionAppear={true}
    transitionAppearTimeout={250}
    transitionEnter={false}
    transitionLeave={false} >
    <JoinServerFormContainer />
  </ReactCSSTransitionGroup>
)

export default NewServer;
