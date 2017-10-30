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
import Confirmation from './Confirmation'
import BoardCreator from './BoardCreator'
import ListContainer from '../containers/ListContainer'

export default function Board({
  board,
  updateBoard,
  deleteBoard,
  createBoard,
  selectBoard,
  list_ids
}) {

  // lists.
  // for each list in board.lists, 
  // output List

  if (board.isFetching) {
    return (
      <Container><Row><Col><p>isLoading Board...</p></Col></Row></Container>
    )
  }

  const board_options = board.board_list.map(board_option => {
    return (
      <option key={`board-option-${board_option.id}`} id={board_option.id} value={board_option.id}>{board_option.title || 'Untitled Board'}</option>
    )
  })


  let lists = list_ids.map(id => {
    return (<Col key={`BoardListCol-${id}`}>
    	<ListContainer key={`ListContainer-${id}`} id={id} />
    </Col>)
  })


  function confirmDeletion() {
    deleteBoard(board.current.id)
  }

  function boardCreation(data) {
    createBoard(data)
  }

  function onBoardSelect(e) {
    e.preventDefault()
    selectBoard(e.target.value)
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
  		 <EditInPlace text={board.current.title || 'Untitled Board'} onSubmit={updateBoard} id={board.current.id} name="title" />
  		</Col>
  		<Col lg={5}>
  			<Form inline className="float-lg-right" onSubmit={selectBoard}>
  			<FormGroup>
  				<Label for="board_id" >Select Board:</Label>
  				<Input type="select" name="board_id" className="ml-sm-2" onChange={onBoardSelect} defaultValue={board.current.id}>
  				{board_options}
  				</Input>
  			</FormGroup>
  			</Form>
        <div className="float-lg-right">
        <Confirmation 
	        buttonLabel="Delete Board" 
	        delete={confirmDeletion} 
	        confirmationLabel="Delete" 
	        className="d-inline-block">
        Delete board? 
        </Confirmation> 
         {' '}/{' '}
        <BoardCreator 
	        actionLabel="Save" 
	        className="d-inline-block" 
	        create={boardCreation} 
	        />
        </div>
  		</Col>
  	</Row>
  	<Row>
  		
  			{lists}

  	</Row>
  
  
  	</Container>


  )
}