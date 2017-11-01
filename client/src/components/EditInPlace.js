import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormGroup,
  Button,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap'

export default class EditInPlace extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      text: props.text,
      placeholder: props.placeholder || `Add a ${props.name}`,
      type: props.type,
      allowNull: props.allowNull || false,
      valid: '',
      message: props.message

    }
    this.onSave = this.onSave.bind(this)
    this.onClick = this.onClick.bind(this)
    this.updateText = this.updateText.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSave(e) {
    e.preventDefault()
      // if blank && allowNull
    if (this.state.text) {
      this.setState({ isEditing: false, valid: '' })
      if (this.props.text !== this.state.text) {
        this.props.onSubmit(e.target, this.props.id)
      }
    } else {
      if (!this.state.allowNull) {
        this.setState({ valid: false })
      }
    }
  }

  onClick(e) {
    e.preventDefault()
    this.setState({ isEditing: true })
  }

  onCancel(e) {
    e.preventDefault()
    if (!this.state.text && this.state.allowNull) {
      this.setState({
        isEditing: false,
        text: this.state.text,
        valid: ''
      })
    } else {
      this.setState({
        isEditing: false,
        text: this.props.text || '',
        valid: ''
      })
    }
  }

  updateText(e) {
    this.setState({ text: e.target.value })
  }

  render() {

    const Tag = this.props.tag

    if (this.state.isEditing) {

      return (

        <Form onSubmit={this.onSave} className="mb-2">
        	<FormGroup>
        		<Input type={this.state.type} name={this.props.name} value={this.state.text} onChange={this.updateText} placeholder={this.state.placeholder} valid={this.state.valid}></Input>
        		<FormFeedback>{ ! this.state.valid ? this.state.message  : ''}</FormFeedback>
        	</FormGroup>
        	<Button color="primary" className="mr-2">Save</Button>
        	<a href="#" className="text-muted" onClick={this.onCancel}>Cancel</a>
        </Form>
      )
    }

    if (Tag) {
      return (<Tag><a href="#" onClick={this.onClick} className="edit-in-place">{this.state.text || this.state.placeholder}</a></Tag>)
    } else {
      return (
        <a href="#" onClick={this.onClick} className="edit-in-place">{this.state.text || this.state.placeholder}</a>)
    }




  }


}


EditInPlace.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

EditInPlace.defaultProps = {
  type: 'text',
  text: '',
  message: "Can't be blank"
}