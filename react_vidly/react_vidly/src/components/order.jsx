import React, { Component } from "react";

class Order extends Component {
  state = {
    tags: ["sadfglk", "dkbkdsb", "kdsjf", "asdf", "sadfsda"]
  };

  styles = {
    fontSize: "15px"
  };

  formatCount = () => {
    const { count } = this.props.order;
    return count !== 0 ? count : "Zero";
  };

  getBadgeClass() {
    let classes = "badge m-2 ";
    let badge =
      this.props.order.count === 0 ? "badge-warning" : "badge-primary";
    classes += badge;
    return classes;
  }

  getDeleteClasses() {
    let classes = "btn btn-sm btn-danger ";
    let badge = this.props.order.count > 0 ? classes : "disabled";
    classes += badge;
    return classes;
  }

  renderTags = () => {
    if (this.state.tags.length === 0) return;
    else {
      return this.state.tags.map(tag => <li key={tag}> {tag} </li>);
    }
  };

  render() {
    let message = <div>No tags available </div>;

    return (
      <div>
        {this.props.children}
        <span className={this.getBadgeClass()}>{this.formatCount()}</span>

        <button
          className="btn btn-secondary btn-sm m-2"
          onClick={() => this.props.onIncrement(this.props.order)}
        >
          +
        </button>
        <button
          className={this.getDeleteClasses()}
          onClick={() => this.props.onDecrement(this.props.order)}
        >
          -
        </button>
        <button
          className="btn btn-sm btn-danger m-2"
          onClick={() => this.props.onDelete(this.props.order.id)}
        >
          Delete
        </button>
        {this.state.tags.length === 0 && message}
        {this.renderTags()}
      </div>
    );
  }
}

export default Order;
