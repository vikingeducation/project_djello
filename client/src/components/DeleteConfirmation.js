import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class DeleteConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this)
    this.confirmDeletion = this.confirmDeletion.bind(this)
  }

  toggle(e) {
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    })
  }

  confirmDeletion(e) {
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    }, this.props.delete())
  }

  render() {
    return (
      <div className={this.props.className}>
        <a href="#" onClick={this.toggle} className="text-danger">{this.props.buttonLabel}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.confirmDeletion}>{this.props.confirmationLabel}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}