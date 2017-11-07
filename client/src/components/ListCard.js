import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import EditInPlace from './EditInPlace'

class ListCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
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



  render() {

    const { title } = this.props.card

    const { description } = this.props.details

    const isFetching = this.props.isFetching

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
          <Row>
          <Col><p>List: list name</p></Col>
          <Col className="mr-auto">Mark as completed</Col>
          </Row>
           <EditInPlace name="description" text={description} tag="p" placeholder="Add a description..."  key={`ListCardEditDescription-${this.props.id}`} onSubmit={this.props.editCard} />
          </ModalBody>
          )

          }
    
        </Modal>
      </div>
    )
  }
}

export default ListCard