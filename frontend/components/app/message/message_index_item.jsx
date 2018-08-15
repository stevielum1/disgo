import React from 'react';

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.message;
    this.state.editMode = false;
    this.state.dropdown = false;
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(e) {
    this.setState({ content: e.currentTarget.value });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.setState({ editMode: false, dropdown: false });
      this.props.chats.update(this.state);
    } else if (e.key === "Escape") {
      this.setState({ editMode: false, content: this.props.message.content, dropdown: false });
    }
  }

  handleCancel(e) {
    this.setState({ editMode: false, content: this.props.message.content, dropdown: false });
  }

  handleSave(e) {
    this.setState({ editMode: false, dropdown: false });
    this.props.chats.update(this.state);
  }

  toggleDropdown(e) {
    this.setState({ dropdown: !this.state.dropdown });
  }

  handleDelete(e) {
    this.toggleDropdown();
    this.props.chats.delete(this.state);
  }

  render() {
    const { message, user, currentUserId } = this.props;

    const dropdownBackground =  this.state.dropdown ? (
      <div className="message-dropdown-background"
      onClick={this.toggleDropdown}>
      </div>
    ) : null;

    const dropdownBox = this.state.dropdown ? (
      <div className="message-dropdown"
      onClick={this.toggleDropdown}>
        <p onClick={() => this.setState({ editMode: true })}>Edit</p>
        <p onClick={this.handleDelete}>Delete</p>
      </div>
    ) : null;


    let editButton;

    if (message.authorId === currentUserId) {
      if (this.state.dropdown) {
        editButton = (
          <i className="fas fa-ellipsis-v"
          onClick={this.toggleDropdown}>
          </i>
        );
      } else {
          editButton = (
            <i className="fas fa-ellipsis-v"
            onClick={this.toggleDropdown}>
            </i>
          );
      }
    } else {
      editButton = null;
    }

    const content = this.state.editMode ? (
      <li>
        <p className="message-created-at">{message.createdAt}</p>
        <div className="message-body">
          <span className="message-author">{user.username}</span>
          <input
            type="text"
            className="edit-message-content"
            value={this.state.content}
            autoFocus={true}
            onChange={this.handleInput}
            onKeyDown={this.handleKeyDown} />
          <div className="edit-message-nav">
            <h6>escape to <p className="edit-message-link" onClick={this.handleCancel}>cancel</p> <i className="fas fa-circle"></i> enter to <p className="edit-message-link" onClick={this.handleSave}>save</p>
            </h6>
          </div>
        </div>
      </li>
    ) : (
      <li>
        <p className="message-created-at">{message.createdAt}</p>
        <div className="message-body">
          <span>
            <span className="message-author">{user.username}</span>
            <span className="message-content">{this.state.content}</span>
          </span>
          {editButton}
        </div>
      </li>
    );

    return (
      <div className="message-index-item-container">
        {content}
        {dropdownBackground}
        {dropdownBox}
      </div>
    )
  }
}

export default MessageIndexItem;
