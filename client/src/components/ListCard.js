// import React from 'react'

// export default function Card({
//   card,
//   id
// }) {

//   const { title } = card

//   return (<a className="card-container">

//   	{title}
//   	</a>)
// }

import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ListCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }



  render() {

    const { title } = this.props.card

    return (
      <div>
        <a className="card-container" onClick={this.toggle}>{title}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}/>
          <ModalBody>
           card container
          </ModalBody>
          
        </Modal>
      </div>
    )
  }
}

export default ListCard