import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  Input,
  InputGroupButton,
  Row,
  Col,
  Button
} from "reactstrap";
import MarkCompletedButton from "./MarkCompletedButton";
import AddMemberDropdown from "./AddMemberDropdown";
import moment from "moment";

const TitleEdit = ({ onChange, onSubmit, title, toggleTitle }) => {
  return (
    <div>
      <InputGroup>
        <Input
          onChange={onChange}
          name="title"
          value={title}
          onKeyPress={onSubmit}
        />
        <InputGroupButton color="info" onClick={toggleTitle}>
          Cancel
        </InputGroupButton>
      </InputGroup>

    </div>
  );
};

const Description = ({ onClick, description }) => {
  return (
    <span>
      {description.length
        ? <span onClick={onClick}>{description}</span>
        : <cite onClick={onClick}> Your description goes here...</cite>}
    </span>
  );
};

const DescriptionEdit = ({
  onChange,
  description,
  onSubmit,
  toggleDescription
}) => {
  return (
    <div>
      <InputGroup>
        <Input
          type="textarea"
          onChange={onChange}
          name="description"
          value={description}
          onKeyPress={onSubmit}
          style={{ backgroundColor: "white" }}
        />
        <InputGroupButton color="info" onClick={toggleDescription}>
          Cancel
        </InputGroupButton>
      </InputGroup>

    </div>
  );
};

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editTitle: false,
      title: props.card.title,
      isSubmitted: false,
      editDescription: false,
      description: props.card.description,
      editMembers: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.toggleMembers = this.toggleMembers.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      editTitle: false,
      editDescription: false,
      isSubmitted: false,
      editMembers: false
    });
  }

  toggleTitle() {
    let title = this.state.isSubmitted
      ? this.state.title
      : this.props.card.title;
    this.setState({
      editTitle: !this.state.editTitle,
      title,
      isSubmitted: false,
      description: this.props.card.description,
      editDescription: false,
      editMembers: false
    });
  }
  toggleDescription() {
    let description = this.state.isSubmitted
      ? this.state.description
      : this.props.card.description;
    this.setState({
      editDescription: !this.state.editDescription,
      description,
      title: this.props.card.title,
      isSubmitted: false,
      editTitle: false,
      editMembers: false
    });
  }
  toggleMembers() {
    this.setState({
      editMembers: !this.state.editMembers
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    let name = e.target.name;
    if (e.key === "Enter") {
      this.setState(
        {
          isSubmitted: true
        },
        () => {
          this.props.updateCard({
            title: this.state.title,
            cardId: this.props.card.id,
            boardId: this.props.boardId,
            description: this.state.description,
            name
          });

          name === "title" ? this.toggleTitle() : this.toggleDescription();
        }
      );
    }
  }

  render() {
    const {
      card,
      listTitle,
      deleteCard,
      boardId,
      users,
      addMember,
      deleteMember
    } = this.props;
    const members = card.UsersCards.map(user => user.User.email);
    const activities = card.Activities.map(act => {
      return {
        author: act.Author.email,
        description: act.description,
        date: act.createdAt
      };
    });
    return (
      <div>
        <div onClick={this.toggle}>
          {card.title}
          {members.length
            ? <div style={{ fontSize: "0.6em" }}>
                <strong>Members:</strong>
                {membersList({ members })}
              </div>
            : null}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            style={{ backgroundColor: "#D1ECFC" }}
          >
            <Row>
              <Col sm="8">
                {!this.state.editTitle
                  ? <span onClick={this.toggleTitle}>
                      {this.state.title}
                    </span>
                  : <TitleEdit
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                      title={this.state.title}
                      toggleTitle={this.toggleTitle}
                    />}
                <p style={{ color: "grey", fontSize: "0.7em" }}>
                  In list: {listTitle}
                </p>
              </Col>
              <Col sm="4">
                <MarkCompletedButton
                  onClick={deleteCard({ cardId: card.id, boardId })}
                />
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            {!this.state.editDescription
              ? <Description
                  onClick={this.toggleDescription}
                  description={this.state.description}
                />
              : <DescriptionEdit
                  toggleDescription={this.toggleDescription}
                  description={this.state.description}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />}
            <hr />
            <h3>Members</h3>
            <Members
              members={members}
              deleteMember={deleteMember}
              cardId={card.id}
              boardId={boardId}
            />

            {!this.state.editMembers
              ? <AddMemberButton onClick={this.toggleMembers} />
              : <div>
                  <AddMemberDropdown
                    members={members}
                    users={users}
                    onClick={addMember({ boardId, cardId: card.id })}
                  />
                  <CancelMemberButton onClick={this.toggleMembers} />
                </div>}
            <hr />
            <h3>Activity</h3>
            <Activities activities={activities} />
          </ModalBody>

        </Modal>
      </div>
    );
  }
}

const membersList = ({ members }) => {
  return members.map((member, i) => {
    return (
      <p key={member + i} style={{ marginBottom: "0" }}>
        {member}
      </p>
    );
  });
};
const Members = ({ members, deleteMember, cardId, boardId }) => {
  const listOfMembers = members.map(member => {
    return (
      <p key={member} style={{ marginBottom: "0" }}>
        {member}
        <DeleteMemberButton
          onClick={deleteMember({ cardId, boardId, email: member })}
        />
      </p>
    );
  });
  return <div>{listOfMembers}</div>;
};
const Activities = ({ activities }) => {
  if (activities.length > 6) {
    activities = activities.slice(0, 6);
  }
  const listOfActivities = activities.map((act, i) => {
    return (
      <p key={act.date + i} style={{ fontSize: "0.8em" }}>
        <cite style={{ color: "grey" }}>{act.author}</cite>
        {" "}
        {act.description}
        {" "}
        <span style={{ color: "grey" }}>
          {moment(act.date).format("MMM Do, YYYY")}
        </span>
      </p>
    );
  });
  return <div>{listOfActivities}</div>;
};

const DeleteMemberButton = ({ onClick }) => {
  return <Button color="link" onClick={onClick}>remove</Button>;
};
const AddMemberButton = ({ onClick }) => {
  return <Button color="link" onClick={onClick}>Add Member</Button>;
};
const CancelMemberButton = ({ onClick }) => {
  return <Button color="link" onClick={onClick}>Cancel</Button>;
};

export default CardModal;
