import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import EditInPlace from './EditInPlace'
import MemberList from './MemberList'
import SelectInPlace from './SelectInPlace'
import Activity from './Activity'


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

    const { card, details, list_id, id, board } = this.props
    const { all_users: users, lists, current: { list_ids } } = board
    const { title, isFetching } = card
    const { description, members, activities } = details



    let memberList, memberIDs = ''
    if (members) {
      memberList = members.map(member => {
        return (
          <MemberList member={member} key={`Card-${member.card_id}-Member-${member.id}`} onRemove={this.props.removeMember} />
        )
      })
      memberIDs = members.map(member => member.id)
    }

    let listOptions = []
    if (list_ids) {

      listOptions = list_ids.map(id => {

        return (
          <option key={`List-Options-${id}`} value={id} disabled={list_id === id}>{lists[id]['title']}</option>)
      })
    }

    let memberOptions = []
    if (users) {
      for (let userID in users) {
        if (memberIDs.indexOf(parseInt(userID)) < 0) {
          memberOptions.push(<option key={`Member-Option-${userID}`} value={userID}>{users[userID].name}</option>)
        }
      }
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
          <Col><span>List: </span><SelectInPlace onSubmit={this.props.changeList} name="list_id" buttonLabel={lists[list_id]['title']} key={`ChangeCardList-${id}`}>
          {listOptions}
          </SelectInPlace>
          <a href="#" onClick={this.markDone} className="float-right"> Mark as completed</a>
         </Col>
          </Row>
           <Row>
           	<Col>
           		<EditInPlace name="description" text={description} tag="p" placeholder="Add a description..."  key={`ListCardEditDescription-${id}`} onSubmit={this.props.editCard} />
           	</Col>
           </Row>
                     <hr />
           <Row>
           	<Col>
           		<h5>Members</h5>
           		{memberList}
           		<SelectInPlace onSubmit={this.props.addMember} name="user_id" buttonLabel="Add Member">
           		{memberOptions}
           		</SelectInPlace>
           	</Col>
           </Row>
           <hr />
           <Row>
           	<Col>
           		<h5>Activity</h5>
           	{ activities ?
           		<Activity activities={activities} users={users} /> : ''
           	}
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