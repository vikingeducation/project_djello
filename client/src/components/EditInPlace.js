import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormGroup,
  Button,
  Input,
  FormText
} from 'reactstrap'

export default class EditInPlace extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      text: props.text || props.placeholder,
      id: props.id
    }
    this.onSave = this.onSave.bind(this)
    this.onClick = this.onClick.bind(this)
    this.updateText = this.updateText.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSave(e) {
    e.preventDefault()
    this.setState({ isEditing: false })
    if (this.props.text !== this.state.text) {
      this.props.onSubmit(e.target, this.props.id)
    }
  }

  onClick(e) {
    e.preventDefault()
    this.setState({ isEditing: true })
  }

  onCancel(e) {
    e.preventDefault()
    this.setState({
      isEditing: false,
      text: this.state.text
    })
  }

  updateText(e) {
    this.setState({ text: e.target.value })
  }

  render() {

    const Tag = this.props.tag || 'h1'

    if (this.state.isEditing) {
      return (

        <Form onSubmit={this.onSave}>
        	<FormGroup>
        		<Input type="text" name="board[title]" value={this.state.text} onChange={this.updateText}></Input>
        	</FormGroup>
        	<Button color="primary" className="mr-2">Save</Button>
        	<a href="#" className="text-muted" onClick={this.onCancel}>Cancel</a>
        </Form>
      )
    }
    return (
      <Tag><a href="#" onClick={this.onClick} className="edit-in-place">{this.state.text}</a></Tag>
    )
  }


}


EditInPlace.propTypes = {
  onSave: PropTypes.func,
  name: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func
}

EditInPlace.defaultProps = {
  text: 'Untitled',
  tag: 'h1'
}