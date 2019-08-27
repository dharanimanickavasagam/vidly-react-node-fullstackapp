import React from "react";

const Like = props => {
  let classes = props.isLiked === true ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <React.Fragment>
      <i className={classes} onClick={props.onClick} />
    </React.Fragment>
  );
};

export default Like;
