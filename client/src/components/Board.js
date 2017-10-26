import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import EditInPlace from './EditInPlace'

// to do 
// 1. set up SElect Board onChange method
// 2. Set up Board title edit inplace

export default function Board({ board, updateBoard, deleteBoard }) {

  // lists.
  // for each list in board.lists, 
  // output List

  if (board.isFetching) {
    return (
      <Container><Row><Col><p>isLoading Board...</p></Col></Row></Container>
    )
  }


  const board_options = board.board_list.map(board_option => {
    if (board_option.id !== board.current.id) {
      return (
        <option key={`board-option-${board_option.id}`} id={board_option.id}>{board_option.title}</option>
      )
    }
  })

  function confirmDeletion(id) {
    confirm('Are you sure you want to delete this board?') ?
      deleteBoard(board.current.id) : null
  }


  return (

    <Container>

  	<Row className="justify-content-between align-items-top">
  		<Col md={9} lg={7} xs={12}>
  		 <EditInPlace text={board.current.title} onSubmit={updateBoard} id={board.current.id} />
  		</Col>
  		<Col lg={5}>
  			<Form inline className="float-lg-right">
  			<FormGroup>
  				<Label for="board_id" >Select Board:</Label>
  				<Input type="select" name="board_id" className="ml-sm-2">
  				<option key={`board-option-${board.current.id}`} disabled>{board.current.title}</option>
  				{board_options}
  				</Input>
  			</FormGroup>
  			</Form>
        <p className="float-lg-right">
        <a href="#" className="text-danger" onClick={confirmDeletion}>Delete Board</a> / <a href="#"  >New Board</a></p>
  		</Col>
  	</Row>
  	<Row>
  		<Col>
  			lists
  		</Col>
  	</Row>
  
  	</Container>


  )
}