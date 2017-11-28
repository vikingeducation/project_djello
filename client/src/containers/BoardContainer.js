import React, { Component } from "react";
//Redux
// import { connect } from "react-redux";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import ModalButton from "../components/ModalButton";

class BoardContainer extends Component {
  componentWillMount() {
    //Call boards from db here
  }
  render() {
    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col">
            <p>Add Board Title</p>
          </div>
          <div className="col">
            <label>Select Board</label>
            <select>
              <option>To-Do list</option>
              <option>List 2</option>
            </select>
            <br />
            <span>Delete Board-</span>
            <span>-New Board</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <BoardCard
              title="Sample"
              description="Sample Description"
              cards={[{ title: "Sample 1 Title" }, { title: "Sample 2 Title" }]}
            />
          </div>
          <div className="col">
            <BoardCard />
          </div>
          <div className="col">
            <p>test</p>
            {/* <ModalButton>
              Test contentTest contentTest contentTest contentTest contentTest
              contentTest contentTest contentTest contentTest contentTest
              contentTest contentTest contentTest contentTest contentTest
              contentTest contentTest content
            </ModalButton>
            <p>test</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default BoardContainer;
