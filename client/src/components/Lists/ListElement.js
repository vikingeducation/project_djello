import React from "react";
import CardContainer from "../../containers/CardContainer";

const ListElement = ({ list, onClick }) => {
  return (
    <div className="List">
      <h5>{list.name}</h5>
      <CardContainer />
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onClick(list.id)}
      >
        Delete List
      </button>
    </div>
  );
};

export default ListElement;
