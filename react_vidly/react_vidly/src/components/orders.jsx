import React, { Component } from "react";
import Order from "./order";

class Orders extends Component {
  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-primary btn-sm"
          onClick={this.props.onResetOrders}
        >
          Reset
        </button>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            /* id={order.id}
            count={order.count} */
            order={order}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            onDelete={this.props.onDelete}
          >
            <h4> Order {order.id}</h4>
          </Order>
        ))}
      </React.Fragment>
    );
  }
}

export default Orders;
