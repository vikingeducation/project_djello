import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import EditInPlace from './EditInPlace'
import MemberList from './MemberList'
import SelectInPlace from './SelectInPlace'


class ListCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
    this.markDone = this.markDone.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    }, () => {
      if (this.state.modal) {
        this.props.loadCard()
      }
    })
  }

  markDone() {
    this.setState({
      modal: !this.state.modal
    }, () => {
      this.props.deleteCard()
    })
  }


  render() {

    const { title } = this.props.card

    const { description, done, members } = this.props.details

    const isFetching = this.props.isFetching


    let memberList, memberIDs = ''
    if (members) {
      memberList = members.map(member => {
        return (
          <MemberList member={member} key={`Card-${member.card_id}-Member-${member.id}`} onRemove={this.props.removeMember} />
        )
      })
      memberIDs = members.map(member => member.id)
    }

    return (
      <div>
        <a className="cardlist" onClick={this.toggle}>{title}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} key={`ListCardModal-${this.props.id}`}>
          <ModalHeader toggle={this.toggle}>
          <EditInPlace name="title" text={title} placeholder="Card title..." key={`ListCardEditTitle-${this.props.id}`} onSubmit={this.props.editCard} />
          </ModalHeader>
          {
            isFetching ? <p>Loading...</p> : 
          (<ModalBody>
          <Row className="mb-3">
          <Col><span>List: <a href="#" onClick={this.props.changeList} >{this.props.list.title}</a></span><a href="#" onClick={this.markDone} className="float-right"> Mark as completed</a>
         </Col>
          </Row>
           <Row>
           	<Col>
           		<EditInPlace name="description" text={description} tag="p" placeholder="Add a description..."  key={`ListCardEditDescription-${this.props.id}`} onSubmit={this.props.editCard} />
           	</Col>
           </Row>
                     <hr />
           <Row>
           	<Col>
           		<h5>Members</h5>
           		{memberList}
           		<SelectInPlace onSubmit={this.props.addMember} options={this.props.users} filter={memberIDs}/>
           	</Col>
           </Row>
           <hr />
           <Row>
           	<Col>
           		<h5>Activity</h5>
           	</Col>
           </Row>
          </ModalBody>
          )

          }
    
        </Modal>
      </div>
    )
  }
}


export default ListCard