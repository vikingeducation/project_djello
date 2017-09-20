import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import {Link} from 'react-router-dom'

class DjelloCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false
    } 
  }
  toggle = ()=>{
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {

    let memberList = this.props.card.users.map(user=>{
      return (
        <Row>{user.email}   <Link>remove</Link></Row>
      )
    })

    let activityList = this.props.card.activities.map(activity=>{
      return (
        <Row>{activity.description}   on {activity.createdAt}</Row>
      )
    })

    return (
      <div>
        <Card><CardBlock>
        <Button color="danger" onClick={this.toggle}>
          {this.props.card.description}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.card.title}</ModalHeader>
          <ModalBody>
            {this.props.card.description}
          </ModalBody>
          <ModalFooter>
            <h3>Members</h3>
            {memberList}
            <Link>Add Member</Link>
          </ModalFooter>
          <ModalFooter>
          <h3>Activity</h3>
            {activityList}
          </ModalFooter>
        </Modal>
        </CardBlock></Card>
      </div>
    );
  }
}

export default DjelloCard