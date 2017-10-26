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
import DeleteConfirmation from './DeleteConfirmation'

// to do 
// 1. set up SElect Board onChange method
// 2. Set up board creation


export default function Board({ board, updateBoard, deleteBoard, createBoard }) {

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

  function confirmDeletion() {
    deleteBoard(board.current.id)
  }

  function boardCreation(e) {
    e.preventDefault()
    console.log('create board')
  }


  if (!board.current.id) {

    return (
      <Container>
       <Row className="justify-content-center text-center align-items-center">
         <Col>
           <h1>Oops! You don't have any boards...</h1>
           <p className="h4"><Button color="primary" onClick={boardCreation}>Create a board</Button></p>
         </Col>
       </Row>
     </Container>
    )
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
  				<option key={`board-option-${board.current.id}`} >{board.current.title}</option>
  				{board_options}
  				</Input>
  			</FormGroup>
  			</Form>
        <div className="float-lg-right">
        <DeleteConfirmation buttonLabel="Delete Board" confirmationLabel="Delete" body="Delete board?" delete={confirmDeletion} className="d-inline-block"  /> / <a href="#"  >New Board</a></div>
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