import React from "react";

import "./listGroup.css";

//Interface
// input : genres list
// output  : onclick

const ListGroup = props => {
  const { listGroupInput, selectedGenre, onClick } = props;

  return (
    <ul className="list-group">
      {listGroupInput.map((list, index) => {
        return (
          <li
            key={list}
            className={
              list === selectedGenre
                ? "list-group-item active"
                : "list-group-item "
            }
            onClick={() => {
              onClick(list);
            }}
          >
            {list}
          </li>
        );
      })}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
