import React, { Component } from "react";
import { Button, Panel, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import EditableField from "./EditableField";
import CardContainer from "../containers/CardContainer";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value, token}) => {
  return (
    <div>
      <CardContainer card={value} token={token} />
    </div>
  );
});

const SortableList = SortableContainer(({items, token}) => {
  return (
    <div>
    {items.map((value, index) => (
      <SortableItem key={`item-${index}`} index={index} token={token} value={value} />
    ))}
    </div>
  )
})

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: this.props.list.cards
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFetching) {
      this.setState({
        cards: nextProps.list.cards
      });
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let {cards} = this.state;

    this.setState({
      cards: arrayMove(cards, oldIndex, newIndex),
    });
  };

  render() {
    const { list, token, onDeleteList, onUpdateList, onCreateCard } = this.props;

    let sortableCardPanels = <SortableList 
      items={this.state.cards}
      token={token}
      onSortEnd={this.onSortEnd} 
      useDragHandle={true} 
    />
  
    return (
      <Col md={6}>
        <Panel
          bsStyle="primary"
          header={
            <EditableField fieldName="title" onSubmit={onUpdateList}>
              <h4>{list.title}</h4>
            </EditableField>
          }
          className="list-panel"
        >
          <ListGroup fill>
            <ListGroupItem>
              <EditableField fieldName="description" onSubmit={onUpdateList}>
                <p className="list-description">{list.description}</p>
              </EditableField>
            </ListGroupItem>
            <ListGroupItem>

              {sortableCardPanels}

              <Button
                bsStyle="success"
                onClick={e => onCreateCard(e, list._id)}
                className="card-create"
              >
                &#43;
              </Button>
            </ListGroupItem>
          </ListGroup>
    
        </Panel>
        <a onClick={e => onDeleteList(e, list._id)} className="list-delete">
          Delete This List
        </a>
      </Col>
    );
  }
}

export default List;
