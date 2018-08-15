import React from 'react';
import { withRouter } from 'react-router-dom';

class MembershipIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDM = this.handleDM.bind(this);
  }

  handleDM(otherUser) {
    //FIND EXISTING DM SERVER
    let currentUserMemberships = this.props.memberships.filter(membership => (
      membership.userId === this.props.currentUser.id
    ));

    let server;
    currentUserMemberships.forEach(membership => {
      //if server.name === "Direct Message_CID_OID"
      //or server.name === "Direct Message_OID_CID"
      //CID = currentUser.id, OID = otherUser.id
      if (this.props.servers[membership.serverId].name === `Direct Message_${this.props.currentUser.id}_${otherUser.id}` || this.props.servers[membership.serverId].name === `Direct Message_${otherUser.id}_${this.props.currentUser.id}`) {
        server = this.props.servers[membership.serverId];
      }
    });
    if (server) {
      const firstChannel = this.props.channels.filter(channel => (
        channel.serverId === server.id
      ))[0];
      this.props.history.push(`/home/${server.id}/${firstChannel.id}`);
    } else {
      //CREATE NEW DM SERVER
      const formData = new FormData();
      formData.append('server[name]', `Direct Message_${this.props.currentUser.id}_${otherUser.id}`);
      this.props.createServer(formData)
      .then(payload => {
        const membership1 = {
          serverId: payload.server.id,
          userId: this.props.currentUser.id
        };
        const membership2 = {
          serverId: payload.server.id,
          userId: otherUser.id
        };
        this.props.createMembership(membership1);
        return this.props.createMembership(membership2);
      })
      .then(payload => {
        const channel = {
          name: "Direct Message",
          server_id: payload.membership.serverId,
          destructible: false
        };
        this.props.createChannel(channel)
        .then(payload => {
          this.props.history.push(`/home/${payload.channel.serverId}/${payload.channel.id}`);
        });
      });
    }
  }

  render() {
    const { member, server, currentUser } = this.props;

    let crown;
    if (!server.name.includes("Direct Message")) {
      if (server.ownerId === member.id) {
        crown = " 👑";
      }
    }

    let handleDMCallback = member.id === currentUser.id ? null : () => this.handleDM(member);

    return (
      <li
        className="member-info"
        onClick={handleDMCallback}>
        <img className="member-photo" src={member.photoUrl} />
        <p>{member.username}{crown}</p>
      </li>
    )
  }
}


export default withRouter(MembershipIndexItem);
